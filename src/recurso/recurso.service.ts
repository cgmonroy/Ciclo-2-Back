import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from './entities/recurso.entity';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';

@Injectable()
export class RecursoService {
  constructor(
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
  ) {}

  create(createRecursoDto: CreateRecursoDto): Promise<Recurso> {
    const recurso = this.recursoRepository.create(createRecursoDto);
    return this.recursoRepository.save(recurso);
  }

  findAll(): Promise<Recurso[]> {
    return this.recursoRepository.find();
  }

  async findOne(id: number): Promise<Recurso> {
    const recurso = await this.recursoRepository.findOne({ where: { id } });
    if (!recurso) {
      throw new NotFoundException(`Recurso with ID ${id} not found`);
    }
    return recurso;
  }

  async update(id: number, updateRecursoDto: UpdateRecursoDto): Promise<Recurso> {
    const recurso = await this.recursoRepository.preload({
      id,
      ...updateRecursoDto,
    });
    if (!recurso) {
      throw new NotFoundException(`Recurso with ID ${id} not found`);
    }
    return this.recursoRepository.save(recurso);
  }

  async remove(id: number): Promise<void> {
    const recurso = await this.findOne(id);
    await this.recursoRepository.remove(recurso);
  }
}
