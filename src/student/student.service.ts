import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/database/database.service';
@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

 async findAll() {
    return await this.prisma.students.findMany({select: { ad: true,soyad:true ,gano:true,akts:true}});
  }

  async findOne(tc: string) {
    const student = await this.prisma.students.findUnique({ where: { tc }, select: { ad: true,soyad:true ,gano:true,akts:true}} );
    return { student : student}; ;
  }


  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
