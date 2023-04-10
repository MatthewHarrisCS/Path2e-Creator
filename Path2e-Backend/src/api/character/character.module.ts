import { Module } from '@nestjs/common';
import { CharacterSchema, CharacterSheet } from 'src/schemas/characterSheet';
import { CharacterController } from './controller/character.controller';
import { CharacterService } from './service/character.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: CharacterSheet.name, schema: CharacterSchema }])],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
