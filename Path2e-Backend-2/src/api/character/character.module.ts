import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterSheet } from 'src/typeorm/entities/characterSheet';
import { CharacterController } from './controller/character.controller';
import { CharacterService } from './service/character.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterSheet])],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
