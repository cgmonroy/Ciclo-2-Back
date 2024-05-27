
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { Monitor } from './entities/monitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Monitor])],
  providers: [MonitorService],
  controllers: [MonitorController],
  exports: [MonitorService],
})
export class MonitorModule {}
