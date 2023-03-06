import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterSheet } from 'src/typeorm/entities/charactersheet';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';

@Injectable()
export class CharacterService {

    constructor(
        @InjectRepository(CharacterSheet) private characters: Repository<CharacterSheet>,
    ) {}

    findCharacters() {
        return this.characters.find();
    }

    createCharacter(body: CreateCharacterDto) {
        console.log(body);
    }
}