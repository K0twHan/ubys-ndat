import { Module } from '@nestjs/common';
import { DerslerService } from './dersler.service';
import { DerslerController } from './dersler.controller';
import { PrismaService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DerslerController],
  providers: [DerslerService],
})
export class DerslerModule {}
