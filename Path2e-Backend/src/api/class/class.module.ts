import { Module } from '@nestjs/common';
import { Class, ClassSchema } from 'src/schemas/class';
import { ClassController } from './controller/class.controller';
import { ClassService } from './service/class.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
