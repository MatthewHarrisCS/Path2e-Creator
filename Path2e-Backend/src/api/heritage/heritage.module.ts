import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heritage } from 'src/typeorm/entities/heritage';
import { HeritageController } from './controller/heritage.controller';
import { HeritageService } from './service/heritage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Heritage])],
  controllers: [HeritageController],
  providers: [HeritageService]
})
export class HeritageModule {}
