import { Module } from '@nestjs/common';
import { Racket, RacketSchema } from 'src/schemas/racket';
import { RacketController } from './controller/racket.controller';
import { RacketService } from './service/racket.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Racket.name, schema: RacketSchema }])],
  controllers: [RacketController],
  providers: [RacketService]
})
export class RacketModule {}
