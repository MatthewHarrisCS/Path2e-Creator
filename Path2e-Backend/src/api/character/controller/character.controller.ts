import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';
import { CharacterService } from '../service/character.service';

@Controller('api/character')
export class CharacterController {
    constructor(private service: CharacterService) {}

    @Get()
    async getCharacters() {
        const characters = await this.service.findCharacters();
        return characters;
    }

    @Post()
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        this.service.createCharacter(createCharacterDto);
    }

}
