// import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthDto } from './dto/auth.dto';


// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}


  

//   @Post('signin')
//   Studentsignin(@Body() dto : AuthDto,@Req() req, @Res() res){
//     return this.authService.Studentsignin(dto,req,res)
//   }

//   @Get('signout')
//   signout(@Req() req, @Res() res){
//     return this.authService.signout(req,res)
//   }

 
// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { AuthService } from './auth.service';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
 async signIn(@Body() signInDto: Record<string, string>,@Req() req : Request, @Res() res : Response){
   
    return this.authService.signIn(signInDto,req,res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req : Request) {
    return req.user;
  }
}