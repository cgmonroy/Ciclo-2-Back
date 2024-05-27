import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoService } from './recurso.service';
import { RecursoController } from './recurso.controller';
import { Recurso } from './entities/recurso.entity';
import { Curso } from '../curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recurso, Curso])],
  providers: [RecursoService],
  controllers: [RecursoController],
  exports: [RecursoService],
})
export class RecursoModule {}
