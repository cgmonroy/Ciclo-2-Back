import { DataSource } from 'typeorm';
import { Curso } from './curso/entities/curso.entity';
import { Monitor } from './monitor/entities/monitor.entity';
import { Recurso } from './recurso/entities/recurso.entity';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Curso, Monitor, Recurso, User],
  synchronize: true,
  dropSchema: process.env.NODE_ENV === 'test',
});
