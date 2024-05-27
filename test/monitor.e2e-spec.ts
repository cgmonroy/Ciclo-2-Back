import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Monitor } from '../src/monitor/entities/monitor.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Curso } from '../src/curso/entities/curso.entity';
import { AppDataSource } from '../src/data-source';

describe('MonitorController (e2e)', () => {
  let app: INestApplication;
  let monitorRepository: Repository<Monitor>;
  let cursoRepository: Repository<Curso>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    monitorRepository = moduleFixture.get<Repository<Monitor>>(getRepositoryToken(Monitor));
    cursoRepository = moduleFixture.get<Repository<Curso>>(getRepositoryToken(Curso));

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    await app.close();
  });

  it('/monitors/:id (GET)', async () => {
    const curso = cursoRepository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await cursoRepository.save(curso);

    const monitor = monitorRepository.create({ nombre: 'John Doe', email: 'john@example.com', cursos: curso });
    await monitorRepository.save(monitor);

    return request(app.getHttpServer())
      .get(`/monitors/${monitor.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.nombre).toBe('John Doe');
        expect(res.body.email).toBe('john@example.com');
        expect(res.body.cursos.id).toBe(curso.id);
      });
  });

  it('/monitors/:id (PUT)', async () => {
    const curso = cursoRepository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await cursoRepository.save(curso);

    const monitor = monitorRepository.create({ nombre: 'John Doe', email: 'john@example.com', cursos: curso });
    await monitorRepository.save(monitor);

    const updatedMonitor = { nombre: 'John Doe Updated', email: 'john.updated@example.com', cursos: curso };

    return request(app.getHttpServer())
      .put(`/monitors/${monitor.id}`)
      .send(updatedMonitor)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.nombre).toBe('John Doe Updated');
        expect(res.body.email).toBe('john.updated@example.com');
        expect(res.body.cursos.id).toBe(curso.id);
      });
  });

  it('/monitors/:id (DELETE)', async () => {
    const curso = cursoRepository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await cursoRepository.save(curso);

    const monitor = monitorRepository.create({ nombre: 'John Doe', email: 'john@example.com', cursos: curso });
    await monitorRepository.save(monitor);

    return request(app.getHttpServer())
      .delete(`/monitors/${monitor.id}`)
      .expect(200);
  });
});
