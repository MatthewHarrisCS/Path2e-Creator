import { Module } from '@nestjs/common';
import { CharacterSheet } from 'src/typeorm/entities/characterSheet';
import { CharacterController } from './controller/character.controller';
import { CharacterService } from './service/character.service';

@Module({
  imports: [],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
