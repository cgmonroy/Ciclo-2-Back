import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Recurso } from '../src/recurso/entities/recurso.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Curso } from '../src/curso/entities/curso.entity';
import { AppDataSource } from '../src/data-source';

describe('RecursoController (e2e)', () => {
  let app: INestApplication;
  let recursoRepository: Repository<Recurso>;
  let cursoRepository: Repository<Curso>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    recursoRepository = moduleFixture.get<Repository<Recurso>>(getRepositoryToken(Recurso));
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

  it('/recursos (POST)', async () => {
    const curso = cursoRepository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await cursoRepository.save(curso);

    const createRecursoDto = { nombre: 'Recurso 1', tipo: 'pdf', cursoId: curso.id };

    return request(app.getHttpServer())
      .post('/recursos')
      .send(createRecursoDto)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.nombre).toBe('Recurso 1');
        expect(res.body.tipo).toBe('pdf');
        expect(res.body.curso.id).toBe(curso.id);
      });
  });

});
