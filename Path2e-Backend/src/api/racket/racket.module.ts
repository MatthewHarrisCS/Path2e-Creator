import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Racket } from 'src/typeorm/entities/racket';
import { RacketController } from './controller/racket.controller';
import { RacketService } from './service/racket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Racket])],
  controllers: [RacketController],
  providers: [RacketService]
})
export class RacketModule {}
