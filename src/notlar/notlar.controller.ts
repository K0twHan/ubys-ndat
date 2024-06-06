import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { NotlarService } from './notlar.service';
import { CreateNotlarDto } from './dto/create-notlar.dto';
import { UpdateNotlarDto } from './dto/update-notlar.dto';

@Controller('notlar')
export class NotlarController {
  constructor(private readonly notlarService: NotlarService) {}


  //öğrencinin aldığı notlar burada gösterilecek
  @Post()
  create(@Param('tc') tc : string, @Body() createNotlarDto: any) {
    return this.notlarService.createNotes(tc ,createNotlarDto);
  }
  @Post('notgir/:tc')
  createNotes( @Body() object : any[], ){
    return this.notlarService.Notes(object);
  }
  @Get()
  findAll(@Body() object : any) {
    return this.notlarService.findAll(object);
  }

  @Get(':tc')
  findByLecturer(@Param('tc') tc: string) {
    return this.notlarService.findByLecturer(tc);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotlarDto: UpdateNotlarDto) {
    return this.notlarService.update(+id, updateNotlarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notlarService.remove(+id);
  }
}
