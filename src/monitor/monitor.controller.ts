import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';

@Controller('monitors')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createMonitorDto: CreateMonitorDto) {
    return this.monitorService.create(createMonitorDto);
  }

  @Get()
  async findAll() {
    return this.monitorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const monitor = await
    this.monitorService.findOne(id);
    if (!monitor) {
      throw new NotFoundException(`Monitor with ID ${id} not found`);
    }
    return monitor;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMonitorDto: UpdateMonitorDto) {
    return this.monitorService.update(id, updateMonitorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.monitorService.remove(id);
  }
}
