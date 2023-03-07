import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterSheet } from 'src/typeorm/entities/characterSheet';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';

@Injectable()
export class CharacterService {

    constructor(
        @InjectRepository(CharacterSheet) private characters: Repository<CharacterSheet>,
    ) {}

    findCharacters() {
        return this.characters.find({relations: ['ancestry', 'background', 'class']});
    }

    createCharacter(body: CreateCharacterDto) {
        const newCharacter = this.characters.create(body);
        const saveCharacter = this.characters.save(newCharacter)
            .catch((err: any) => {console.log(err) });
        return saveCharacter;
    }
}