import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Monitor } from '../../monitor/entities/monitor.entity';
import { Recurso } from '../../recurso/entities/recurso.entity';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Monitor, monitor => monitor.cursos)
  monitores: Monitor[];

  @OneToMany(() => Recurso, recurso => recurso.curso)
  recursos: Recurso[];
}
