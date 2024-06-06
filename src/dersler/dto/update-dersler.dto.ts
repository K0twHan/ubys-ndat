import { PartialType } from '@nestjs/mapped-types';
import { CreateDerslerDto } from './create-dersler.dto';

export class UpdateDerslerDto extends PartialType(CreateDerslerDto) {
    tc: string
}
