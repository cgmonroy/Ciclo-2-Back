import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

describe('CursoService', () => {
  let service: CursoService;
  let repository: Repository<Curso>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        {
          provide: getRepositoryToken(Curso),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CursoService>(CursoService);
    repository = module.get<Repository<Curso>>(getRepositoryToken(Curso));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a curso', async () => {
    const curso: Curso = {
      id: 1,
      nombre: 'Curso 1',
      descripcion: 'Descripción del curso 1',
      monitores: [],
      recursos: [],
    };
    jest.spyOn(repository, 'create').mockReturnValue(curso);
    jest.spyOn(repository, 'save').mockResolvedValue(curso);

    expect(await service.create(curso)).toEqual(curso);
  });

  it('should remove a curso', async () => {
    const curso: Curso = {
      id: 1,
      nombre: 'Curso 1',
      descripcion: 'Descripción del curso 1',
      monitores: [],
      recursos: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(curso);
    jest.spyOn(repository, 'remove').mockResolvedValue(curso);

    expect(await service.remove(1)).toEqual(curso);
  });
});
