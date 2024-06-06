// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { DatabaseModule } from 'src/database/database.module';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [DatabaseModule,JwtModule,PassportModule],
//   providers: [AuthService, JwtService],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentModule } from '../student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtSecret } from '../utils/constant'
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    StudentModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}