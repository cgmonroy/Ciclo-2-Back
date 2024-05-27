import { Test, TestingModule } from '@nestjs/testing';
import { RecursoService } from './recurso.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recurso } from './entities/recurso.entity';
import { Curso } from '../curso/entities/curso.entity';

describe('RecursoService', () => {
  let service: RecursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecursoService,
        {
          provide: getRepositoryToken(Recurso),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Curso),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RecursoService>(RecursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
