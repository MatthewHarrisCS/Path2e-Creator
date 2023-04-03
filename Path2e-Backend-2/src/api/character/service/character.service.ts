import { Injectable } from '@nestjs/common';
import { CharacterSheet } from 'src/schemas/characterSheet';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';

@Injectable()
export class CharacterService {

    constructor(
    ) {}

    findCharacters(user) {
    }

    createCharacter(body: CreateCharacterDto) {
    }
}