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

    findCharacters(user) {
        return this.characters.find({
            relations: ['ancestry', 'background', 'gameClass'],
            where: { user: user }
        });
    }

    createCharacter(body: CreateCharacterDto) {
        const newCharacter = this.characters.create(body);
        const saveCharacter = this.characters.insert(newCharacter)
            .catch((err: any) => {console.log(err) });
        return saveCharacter;
    }
}