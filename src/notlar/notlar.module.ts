import { Module } from '@nestjs/common';
import { NotlarService } from './notlar.service';
import { NotlarController } from './notlar.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotlarController],
  providers: [NotlarService],
})
export class NotlarModule {}
