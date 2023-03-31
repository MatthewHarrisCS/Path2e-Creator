import { Module } from '@nestjs/common';
import { Background } from 'src/typeorm/entities/background';
import { BackgroundController } from './controller/background.controller';
import { BackgroundService } from './service/background.service';

@Module({
  imports: [],
  controllers: [BackgroundController],
  providers: [BackgroundService]
})
export class BackgroundModule {}
