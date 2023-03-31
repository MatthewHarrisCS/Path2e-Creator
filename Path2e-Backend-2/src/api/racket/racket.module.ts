import { Module } from '@nestjs/common';
import { Racket } from 'src/typeorm/entities/racket';
import { RacketController } from './controller/racket.controller';
import { RacketService } from './service/racket.service';

@Module({
  imports: [],
  controllers: [RacketController],
  providers: [RacketService]
})
export class RacketModule {}
