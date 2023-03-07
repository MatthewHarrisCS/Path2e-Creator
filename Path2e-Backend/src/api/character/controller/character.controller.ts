import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';
import { CharacterService } from '../service/character.service';

@Controller('api/character')
export class CharacterController {
    constructor(private service: CharacterService) {}

    @Get()
    async getCharacters(@Param() params) {
        //
        //
        // IMPLEMENT PARAMETERS FOR USER-SPECIFIC CHARACTERS
        //
        //
        const characters = await this.service.findCharacters();
        return characters;
    }

    @Post()
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.service.createCharacter(createCharacterDto);
    }
}
