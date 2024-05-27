import { Test, TestingModule } from '@nestjs/testing';
import { MonitorService } from './monitor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { Repository } from 'typeorm';

describe('MonitorService', () => {
  let service: MonitorService;
  let repository: Repository<Monitor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitorService,
        {
          provide: getRepositoryToken(Monitor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MonitorService>(MonitorService);
    repository = module.get<Repository<Monitor>>(getRepositoryToken(Monitor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
