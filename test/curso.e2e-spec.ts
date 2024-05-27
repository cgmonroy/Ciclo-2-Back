import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Curso } from '../src/curso/entities/curso.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppDataSource } from '../src/data-source';

describe('CursoController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Curso>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Curso>>(getRepositoryToken(Curso));

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

  it('/cursos/:id (GET)', async () => {
    const curso = repository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await repository.save(curso);

    return request(app.getHttpServer())
      .get(`/cursos/${curso.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.nombre).toBe('Curso 1');
        expect(res.body.descripcion).toBe('Descripción del Curso 1');
      });
  });

  it('/cursos/:id (PUT)', async () => {
    const curso = repository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await repository.save(curso);

    const updatedCurso = { nombre: 'Curso 1 Actualizado', descripcion: 'Descripción Actualizada del Curso 1' };

    return request(app.getHttpServer())
      .put(`/cursos/${curso.id}`)
      .send(updatedCurso)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.nombre).toBe('Curso 1 Actualizado');
        expect(res.body.descripcion).toBe('Descripción Actualizada del Curso 1');
      });
  });

  it('/cursos/:id (DELETE)', async () => {
    const curso = repository.create({ nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' });
    await repository.save(curso);

    return request(app.getHttpServer())
      .delete(`/cursos/${curso.id}`)
      .expect(200);
  });
});
