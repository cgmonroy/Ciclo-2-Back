import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) {
      throw new NotFoundException(`Curso with ID ${id} not found`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoRepository.preload({
      id,
      ...updateCursoDto,
    });
    if (!curso) {
      throw new NotFoundException(`Curso with ID ${id} not found`);
    }
    return this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<Curso> {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
    return curso;
  }
}
