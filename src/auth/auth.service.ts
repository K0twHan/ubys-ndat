import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/database.service';
import { Request, Response } from 'express';
import { CommonService } from 'src/database/common.service';
import { access } from 'fs';
import { jwtSecret } from 'src/utils/constant';
import cookieParser from 'cookie-parser';
import path from 'path';

@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private commonService: CommonService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: Record<string, string>, req: Request, res: Response) {
    try {
      const { tc, password } = signInDto;
      console.log('TC:', tc, 'Password:', password);

      const user = await this.commonService.findUniqueData(tc);

      if (!user || user.data.parola !== password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.data.id, tcno: user.data.tc };
      console.log('User role:', user.data.rol);

      const jwt = await this.jwtService.signAsync(payload,{expiresIn: '1h',secret:jwtSecret});


     
      
      res.cookie('jwt',jwt,{httpOnly:false,secure:false,sameSite:'lax',maxAge:1000000000000000,priority:'high'}).json({
        access_token: jwt,
        role: user.data.rol,
      });
    } catch (error) {
      console.error('Error during sign-in:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('An error occurred during sign-in');
    }
  }
}
