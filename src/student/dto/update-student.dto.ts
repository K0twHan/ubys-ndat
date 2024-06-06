import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import {  isNotEmpty } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
   
}
