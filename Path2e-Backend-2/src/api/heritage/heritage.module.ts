import { Module } from '@nestjs/common';
import { Heritage } from 'src/typeorm/entities/heritage';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.service';

@Module({
  imports: [],
  controllers: [HeritageController],
  providers: [HeritageService]
})
export class HeritageModule {}
