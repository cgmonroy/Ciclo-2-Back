import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';

@Controller('recursos')
export class RecursoController {
  constructor(private readonly recursoService: RecursoService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createRecursoDto: CreateRecursoDto) {
    return this.recursoService.create(createRecursoDto);
  }

  @Get()
  async findAll() {
    return this.recursoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const recurso = await this.recursoService.findOne(id);
    if (!recurso) {
      throw new NotFoundException(`Recurso with ID ${id} not found`);
    }
    return recurso;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRecursoDto: UpdateRecursoDto) {
    return this.recursoService.update(id, updateRecursoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.recursoService.remove(id);
  }
}
