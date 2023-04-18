import { Injectable } from '@nestjs/common';
import { CharacterSheet } from 'src/schemas/characterSheet';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {

    constructor(
        @InjectModel(CharacterSheet.name) private characters: Model<CharacterSheet>
    ) {}

    findCharacters(user) {
        return this.characters.find({user: user});
    }

    createCharacter(body: CreateCharacterDto) {
        return this.characters.create(body);
    }
    
    deleteCharacter(_id: Types.ObjectId) {
        try {
            return this.characters.findByIdAndRemove(_id).exec();
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}