import { Module } from '@nestjs/common';
import { Class } from 'src/schemas/class';
import { ClassController } from './controller/class.controller';
import { ClassService } from './service/class.service';

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
