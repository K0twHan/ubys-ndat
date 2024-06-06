import { PartialType } from '@nestjs/mapped-types';
import { CreateNotlarDto } from './create-notlar.dto';

export class UpdateNotlarDto extends PartialType(CreateNotlarDto) {}
