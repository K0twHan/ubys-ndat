import { Injectable } from '@nestjs/common';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class ManagementService {
  constructor(private readonly dbService: PrismaService) {}
  create(createManagementDto: CreateManagementDto) {
    return 'This action adds a new management';
  }

 async findAll() {
     const deneme = await this.dbService.lecturer.findMany();
     console.log(deneme)
     return deneme
  }

  async findOne() {
    return await this.dbService.lectures.findMany();
  }

  async update(updateManagementDto: any) {
    const { yenihocatcno, dersid } = updateManagementDto;
    const deneme = await this.dbService.lectures.findUnique({ where: { id: dersid } ,select: { lecturerId: true } });
    const deneme2 = await this.dbService.lecturer.findUnique({ where: { id: deneme.lecturerId },select: { tc: true}});
    if (deneme2.tc === "00000000000") {
      await this.dbService.lecturer.update({ where: { tc: deneme2.tc }, data: { dersSaati: 0 } });
       "TC kimlik numarası 00000000000 olan hoca güncellendi.";
    }  {
      // Yeni hocanın ders saati bilgisi
      const derssaati = await this.dbService.lecturer.findUnique({ where: { tc: yenihocatcno } });
      
      if (!derssaati) {
        return "Yeni hoca bulunamadı";
      }
  
      // Eski hocanın ders saati bilgisi
      const eskiderssaati = await this.dbService.lecturer.findUnique({ where: { tc: deneme2.tc } });
      
      if (!eskiderssaati) {
        return "Eski hoca bulunamadı";
      }
  
      // Yeni hocanın ders saati 20'den fazla olamaz
      if (derssaati.dersSaati > 20) {
        return "Yeni hocanın ders saati 20'den fazla olamaz";
      } else {
        // Dersin saat bilgisi
        const yenisaat = await this.dbService.lectures.findUnique({ where: { id: dersid }, select: { saat: true } });
  
        if (!yenisaat) {
          return "Ders bulunamadı";
        }
  
        // Yeni hocanın toplam ders saati 20'den fazla olamaz
        if (derssaati.dersSaati + yenisaat.saat > 20) {
          return "Yeni hocanın toplam ders saati 20'den fazla olamaz";
        } else {
          // Yeni hocanın ders saatini güncelle
          const hoca = await this.dbService.lecturer.update({
            where: { tc: yenihocatcno },
            data: { dersSaati: (yenisaat.saat + derssaati.dersSaati) }
          });
  
          // Eski hocanın ders saatini güncelle
          const eskiHoca = await this.dbService.lecturer.update({
            where: { tc: deneme2.tc },
            data: { dersSaati: (eskiderssaati.dersSaati - yenisaat.saat) }
          });
  
          // Dersin öğretim görevlisini güncelle
          const updatedDers = await this.dbService.lectures.update({
            where: { id: dersid },
            data: { lecturerId: hoca.id }
          });
  
          return updatedDers;
        }
      }
    }
  }
  

  remove(id: number) {
    return `This action removes a #${id} management`;
  }
}
