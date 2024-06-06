import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagementService } from './management.service';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Post()
  create(@Body() createManagementDto: CreateManagementDto) {
    return this.managementService.create(createManagementDto);
  }

  //öğretmenleri gönder
  @Get()
  findAll() {
    return this.managementService.findAll();
  }
//dersleri gönder
  @Get(':id')
  findOne() {
    return this.managementService.findOne();
  }

  @Patch(':id')
  update( @Body() updateManagementDto: any) {
    return this.managementService.update( updateManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementService.remove(+id);
  }
}
