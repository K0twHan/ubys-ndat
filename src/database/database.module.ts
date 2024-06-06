import { Module } from '@nestjs/common';
import { PrismaService } from './database.service';
import { CommonService } from './common.service';

@Module({
    imports: [],
    exports: [PrismaService,CommonService],
    providers: [PrismaService,CommonService],
})
export class DatabaseModule {}
