import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity()
export class Monitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @ManyToOne(() => Curso, curso => curso.monitores)
  cursos: Curso;
}
