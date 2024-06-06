import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDerslerDto } from './dto/create-dersler.dto';
import { UpdateDerslerDto } from './dto/update-dersler.dto';
import { PrismaService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DerslerService {
  constructor(private readonly prisma: PrismaService,private readonly jwtService : JwtService) {}
 async createLecture(createDerslerDto: CreateDerslerDto) {
    
    const lecture = await this.prisma.lectures.create({data : createDerslerDto})
    return lecture;
  }

  async findAll(tc : string) {
   //const deneme = await this.jwtService.decode(req.cookies['jwt'])
  // const {tcno} = deneme  
  // console.log(deneme)
  // console.log(tcno)
   
const ogr = await this.prisma.students.findUnique({ where: { tc: tc } });
console.log(ogr);

const idler = await this.prisma.studentLecture.findMany({
    where: { studentId: ogr.id, isEnable: true },
    select: { lectureId: true }
});
console.log(idler);

const dersler = await this.prisma.lectures.findMany({
    where: { id: { in: idler.map((item) => item.lectureId) } },
    select: { ad: true, akts: true, kredi: true, donem: true, lecturerId: true,id:true }
});

const notes = await this.prisma.notes.findMany({
    where: { studentId: ogr.id },
    select: { courseId: true, not1: true, not2: true, proje: true, harfNotu: true }
});

// Dersler ve notları birleştirmek
const derslerWithNotes = dersler.map(ders => {
    const dersNotlari = notes.filter(note => note.courseId === ders.id);
    return {
        ...ders,
        notlar: dersNotlari
    };
});

return derslerWithNotes;
  }
  //öğrencinin alabileceği dersler
 async findOne(deneme: string) {
  console.log(deneme)
    const ogr = await this.prisma.students.findUnique({where: {tc: deneme}})
   if(Number(ogr.gano) < parseFloat("1.8") && ogr.donem == 5)
    {
      return {status : HttpStatus.UNAUTHORIZED, message : "Gano 1.8'den düşük olduğu için 5. dönemde ders alamazsınız"}
    }
    console.log(ogr)
    const dersler = await this.prisma.lectures.findMany({where: {bolum: ogr.bolum}});
     
    return dersler;
  }
    //dersi  onaylama
     async update(updateDerslerDto: UpdateDerslerDto) {
      const {tc, ...data} = updateDerslerDto;
      const ogr = (await this.prisma.students.findUnique({where: {tc: tc}})).id;
     
      const dersler = await this.prisma.studentLecture.findMany({where: {isEnable : false}});
      if(dersler.map((item) => item.isEnable).includes(false))
        {
          return await this.prisma.studentLecture.updateMany({where: {studentId: ogr },data : {isEnable:true}},);
    }
  }
  //danışmanın göreceği yer işte
  async getIstekDers() {
    const ogr = await this.prisma.studentLecture.findMany({
      where: { isEnable: false },
      select: {
        studentId: true,
        lectureId: true,
      },
    });
console.log("bu deneme" ,ogr)
    const ogrenciIds = ogr.map(item => item.studentId);
    const dersIds = ogr.map(item => item.lectureId);
console.log(ogrenciIds, dersIds)
    const ogrenciler = await this.prisma.students.findMany({
      where: { id: { in: ogrenciIds } },
      select: { ad: true, soyad: true, tc: true ,id:true},
    });

    const dersler = await this.prisma.lectures.findMany({
      where: { id: { in: dersIds } },
      select: { ad: true, kredi: true ,id:true},
    });

    // Öğrenci ve ders bilgilerini birleştir
    const result = ogr.map(item => {
      const ogrenci = ogrenciler.find(o => o.id === item.studentId);
      const ders = dersler.find(d => d.id === item.lectureId);

      return {
        studentId: item.studentId,
        lectureId: item.lectureId,
        ogrenci: ogrenci ? { ad: ogrenci.ad, soyad: ogrenci.soyad, tc: ogrenci.tc } : null,
        ders: ders ? { dersAdi: ders.ad, kredi: ders.kredi } : null,
      };
    });

    //await this.prisma.studentLecture.updateMany({where: {isEnable: false},data: {isEnable: true}})
    return result;
  }
  //öğrencinin onaya sunacağı dersler
  async kayitOlustur(object: any) {
    const { tc, dersler } = object;
  
    // Dersler yoksa veya dersler bir dizi değilse hata fırlat
    if (!dersler || !Array.isArray(dersler)) {
      throw new Error("Dersler bir dizi olmalıdır");
    }
  
    const ogr = await this.prisma.students.findUnique({ where: { tc: tc } });
  
    if (!ogr) {
      throw new Error("Öğrenci bulunamadı");
    }
  
    try {
      const derslerKayitlari = [];
  
      for (const ders of dersler) {
        const derslerListesi = await this.prisma.lectures.findMany({ where: { ad: ders.ad } });
  
        for (const derske of derslerListesi) {
          if (!derske.id) {
            throw new Error(`Geçersiz ders verisi: ${JSON.stringify(ders)}`);
          }
  
          // Mevcut kaydı kontrol et
          const mevcutKayit = await this.prisma.studentLecture.findUnique({
            where: {
              studentId_lectureId: {
                studentId: ogr.id,
                lectureId: derske.id,
              },
            },
          });
  
          if (mevcutKayit) {
            derslerKayitlari.push(mevcutKayit); // Kayıt zaten varsa, mevcut kaydı diziye ekle
          } else {
            const yeniKayit = await this.prisma.studentLecture.create({
              data: {
                studentId: ogr.id,
                lectureId: derske.id,
              },
            });
            derslerKayitlari.push(yeniKayit);
          }
        }
      }
  
      console.log(derslerKayitlari);
      return derslerKayitlari;
    } catch (e) {
      console.log("Hata oluştu:", e);
      throw e; // Hata yakalama sırasında hata iletisini dışarıya aktarmak iyi bir pratiktir.
    }
  }
  
}


  
