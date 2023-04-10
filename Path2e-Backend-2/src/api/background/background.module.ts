import { Module } from '@nestjs/common';
import { Background, BackgroundSchema } from 'src/schemas/background';
import { BackgroundController } from './controller/background.controller';
import { BackgroundService } from './service/background.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Background.name, schema: BackgroundSchema }])],
  controllers: [BackgroundController],
  providers: [BackgroundService]
})
export class BackgroundModule {}
