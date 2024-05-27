import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity()
export class Recurso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @ManyToOne(() => Curso, curso => curso.recursos)
  curso: Curso;
}