import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/database.service';
import { StudentModule } from './student/student.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { NotlarModule } from './notlar/notlar.module';
import { DerslerModule } from './dersler/dersler.module';
import { ManagementModule } from './management/management.module';




@Module({
  imports: [AuthModule,StudentModule, DatabaseModule,  NotlarModule, DerslerModule, ManagementModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
