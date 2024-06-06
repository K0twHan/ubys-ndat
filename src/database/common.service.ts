import { Injectable } from '@nestjs/common';
import { PrismaService } from './database.service';

@Injectable()
export class CommonService {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueData(uniqueValue: string) {
    let result;

    // student tablosunda ara
    result = await this.prisma.students.findUnique({
      where: { tc: uniqueValue },
    });
    if (result) {
      return { table: 'students', data: result };
    }

    // lecturer tablosunda ara
    result = await this.prisma.lecturer.findUnique({
      where: { tc: uniqueValue },
    });
    if (result) {
      return { table: 'lecturer', data: result };
    }

     // manager tablosunda ara
     result = await this.prisma.manager.findUnique({
        where: { tc: uniqueValue },
      });
      if (result) {
        return { table: 'manager', data: result };
      }
  
      // advisor tablosunda ara
      result = await this.prisma.advisor.findUnique({
        where: { tc: uniqueValue },
      });
      if (result) {
        return { table: 'advisor', data: result };
      }

    return null;
  }
}
