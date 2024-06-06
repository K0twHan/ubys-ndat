import { Injectable, ParseIntPipe } from '@nestjs/common';
import { CreateNotlarDto } from './dto/create-notlar.dto';
import { UpdateNotlarDto } from './dto/update-notlar.dto';
import { PrismaService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { arrayBuffer } from 'stream/consumers';

@Injectable()
export class NotlarService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotes(tc : string,createNotlarDto : any) {
    console.log(tc)
    const ders = await this.prisma.lectures.findFirst({where: {ad: createNotlarDto.dersAdi}});
    console.log(ders)
    const nots = await this.prisma.notes.create({data : {studentId: createNotlarDto.ogrenciId, courseId: ders.id, not1:createNotlarDto.vize, not2:createNotlarDto.final,proje:createNotlarDto.proje ,harfNotu:createNotlarDto.harfNotu}})
    return nots


  }

  //bu fonksiyon öğçretmenin not verdiği koddur
  async Notes(createNotlarDto: any,) {

      const { vize, final } = createNotlarDto;
    // Find the lecture by name
    const ders = await this.prisma.lectures.findFirst({ where: { ad: createNotlarDto.dersAdi } });
    if (!ders) {
      throw new Error(`Lecture with name ${createNotlarDto.dersAdi} not found.`);
    }
    console.log(createNotlarDto.dersAdi,createNotlarDto.ogrenciId,createNotlarDto.vize,createNotlarDto.final,createNotlarDto.proje,createNotlarDto.harfNotu)
    // Find the student by id
    console.log(createNotlarDto.ogrenciId)
    console.log(ders)
    const ogr = await this.prisma.students.findUnique({where : {id : createNotlarDto.ogrenciId}});
    console.log(ogr + "bu nedir")
    if (!ogr) {
      throw new Error(`Student with id ${createNotlarDto.ogrenciId} not found.`);
    }
  
    // Create the note
    if (await this.prisma.notes.findUnique({ where: { studentId_courseId: { studentId: ogr.id, courseId: ders.id } } })) {
      await this.prisma.notes.update({where : {studentId_courseId: {studentId: ogr.id, courseId: ders.id}},data : {not1: vize, not2: final, proje: createNotlarDto.proje || 0 , harfNotu: createNotlarDto.harfNotu || 'FF'}})
    }
    else{
    const nots = await this.prisma.notes.create({
      data: {
        studentId: ogr.id,
        courseId: ders.id,
        not1: vize,  // Ensure `vize` is parsed to a float if necessary
        not2: final, // Ensure `final` is parsed to a float if necessary
        proje: createNotlarDto.proje || 0,
        harfNotu: createNotlarDto.harfNotu || 'FF'
      }
    });
    // burası deneme kodu yazıcağım yer hata verirse silersin
    const gano = await this.calculateGPA(ogr.id)
    await this.prisma.students.update({where: {id: ogr.id}, data: {gano: Number(gano)}})




    // burası kodun bitişi
    return nots;}
  }

  async findAll(object : any) {
   
    const {tc} = object
    const ogr = await this.prisma.students.findUnique({where: {tc: tc}});
    const note = await this.prisma.notes.findMany({where: {studentId: ogr.id},select: { not1: true, not2: true, proje: true}});
    return note;
  }

  async findByLecturer(tc: string) {
    const lecturer = await this.prisma.lecturer.findUnique({ where: { tc: tc } });
    const dersler = await this.prisma.lectures.findMany({ where: { lecturerId: lecturer.id } });
    const ogr = await this.prisma.studentLecture.findMany({
      where: { lectureId: { in: dersler.map((item) => item.id) } },
      select: { studentId: true, lectureId: true }
    });
    const ogrenciler = await this.prisma.students.findMany({
      where: { id: { in: ogr.map((item) => item.studentId) } },
      select: { ad: true, soyad: true, id: true }
    });
    const notlar = await this.prisma.notes.findMany({
      where: { courseId: { in: dersler.map((item) => item.id) }, studentId: { in: ogr.map((item) => item.studentId) } },
      select: { not1: true, not2: true, proje: true, studentId: true, courseId: true }
    });

    // Dersler ve öğrenci notlarını eşleştirerek veriyi yapılandır
    const derslerData = dersler.map((ders) => {
      const dersOgrencileri = ogr.filter((ogrItem) => ogrItem.lectureId === ders.id);
      const ogrencilerData = dersOgrencileri.map((ogrItem) => {
        const ogrenci = ogrenciler.find((ogrenciItem) => ogrenciItem.id === ogrItem.studentId);
        const ogrenciNotlari = notlar.filter((not) => not.studentId === ogrItem.studentId && not.courseId === ders.id);
        return {
          ad: ogrenci.ad,
          soyad: ogrenci.soyad,
          id : ogrenci.id,
          notlar: ogrenciNotlari.map((not) => ({
            not1: not.not1,
            not2: not.not2,
            proje: not.proje
          }))
        };
      });
      return {
        ad: ders.ad,
        ogrenciler: ogrencilerData
      };
    });

    return { dersler: derslerData };
  }

  update(id: number, updateNotlarDto: UpdateNotlarDto) {
    return `This action updates a #${id} notlar`;
  }

  remove(id: number) {
    return `This action removes a #${id} notlar`;
  }


  //burası deneme kodunun fonksiyonu


  async calculateGPA(studentId: number): Promise<number> {
    const notes = await this.prisma.notes.findMany({
      where: { studentId },
      include: { course: true },
    });

    let totalCredits = 0;
    let totalPoints = 0;

    notes.forEach((note) => {
      const gradePoint = this.getGradePoint(note.harfNotu);
      totalCredits += note.course.akts;
      totalPoints += gradePoint * note.course.akts;
    });

    return totalPoints / totalCredits;
  }

  private getGradePoint(letterGrade: string): number {
    const gradePoints = {
      'AA': 4.0,
      'BA': 3.5,
      'BB': 3.0,
      'CB': 2.5,
      'CC': 2.0,
      'DC': 1.5,
      'DD': 1.0,
      'FD': 0.5,
      'FF': 0.0,
    };

    return gradePoints[letterGrade] || 0.0;
  }
}





