import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MonitorModule } from './monitor/monitor.module';
import { CursoModule } from './curso/curso.module';
import { RecursoModule } from './recurso/recurso.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => AppDataSource.options,
      inject: [ConfigService],
    }),
    MonitorModule,
    CursoModule,
    RecursoModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
