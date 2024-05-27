import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  async findAll() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const curso = await this.cursoService.findOne(id);
    if (!curso) {
      throw new NotFoundException(`Curso with ID ${id} not found`);
    }
    return curso;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.cursoService.remove(id);
  }
}
