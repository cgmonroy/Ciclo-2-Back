import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from './entities/monitor.entity';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Monitor)
    private monitorRepository: Repository<Monitor>,
  ) {}

  create(createMonitorDto: CreateMonitorDto): Promise<Monitor> {
    const monitor = this.monitorRepository.create(createMonitorDto);
    return this.monitorRepository.save(monitor);
  }

  findAll(): Promise<Monitor[]> {
    return this.monitorRepository.find();
  }

  async findOne(id: number): Promise<Monitor> {
    const monitor = await this.monitorRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException(`Monitor with ID ${id} not found`);
    }
    return monitor;
  }

  async update(id: number, updateMonitorDto: UpdateMonitorDto): Promise<Monitor> {
    const monitor = await this.monitorRepository.preload({
      id,
      ...updateMonitorDto,
    });
    if (!monitor) {
      throw new NotFoundException(`Monitor with ID ${id} not found`);
    }
    return this.monitorRepository.save(monitor);
  }

  async remove(id: number): Promise<void> {
    const monitor = await this.findOne(id);
    await this.monitorRepository.remove(monitor);
  }
}
