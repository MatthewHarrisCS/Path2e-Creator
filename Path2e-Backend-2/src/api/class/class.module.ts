import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/typeorm/entities/class';
import { ClassController } from './controller/class.controller';
import { ClassService } from './service/class.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
