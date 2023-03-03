import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Background } from 'src/typeorm/entities/background';
import { BackgroundController } from './controller/background.controller';
import { BackgroundService } from './service/background.service';

@Module({
  imports: [TypeOrmModule.forFeature([Background])],
  controllers: [BackgroundController],
  providers: [BackgroundService]
})
export class BackgroundModule {}
