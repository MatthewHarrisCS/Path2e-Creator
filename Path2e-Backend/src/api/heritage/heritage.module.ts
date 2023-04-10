import { Module } from '@nestjs/common';
import { Heritage, HeritageSchema } from 'src/schemas/heritage';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Heritage.name, schema: HeritageSchema }])],
  controllers: [HeritageController],
  providers: [HeritageService]
})
export class HeritageModule {}
