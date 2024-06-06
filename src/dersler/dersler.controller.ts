import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DerslerService } from './dersler.service';
import { CreateDerslerDto } from './dto/create-dersler.dto';
import { UpdateDerslerDto } from './dto/update-dersler.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

@Controller('dersler')
export class DerslerController {
  constructor(private readonly derslerService: DerslerService) {}

  @Post()
  create(@Body() createDerslerDto: CreateDerslerDto) {
    return this.derslerService.createLecture(createDerslerDto);
  }

  //öğrencinin aldığı dersler gösterilir
  //@UseGuards(JwtAuthGuard)
  @Get(':tc')
  findAll(@Param('tc') tc: string) {
    return this.derslerService.findAll(tc);
  }
  //bu öğrencinin seçebileceği dersler gösterilir
  @Get('sec/:tc')
  findAvaliable(@Param('tc') tc: string) {
    return this.derslerService.findOne(tc);
  }
  //bu öğrencinin kaydını onaylarken
  @Patch(':id')
  update( @Body() updateDerslerDto: UpdateDerslerDto) {
    return this.derslerService.update( updateDerslerDto);
  }
  //bu kaydı onaya sunarken
  @Get('istek/:id')
  getistekders() {
    return this.derslerService.getIstekDers();
  }
  @Post('kayit')
  kayit(@Body() object : any){
    return this.derslerService.kayitOlustur(object);
  }
}
