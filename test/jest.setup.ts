import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../src/data-source'; 

beforeEach(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  await AppDataSource.dropDatabase();
  await AppDataSource.synchronize();
});

afterEach(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
