import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ancestry } from 'src/typeorm/entities/ancestry';
import { AncestryController } from './controller/ancestry.controller';
import { AncestryService } from './service/ancestry.service';
@Module({
  imports: [TypeOrmModule.forFeature([Ancestry])],
  controllers: [AncestryController],
  providers: [AncestryService]
})
export class AncestryModule {}
