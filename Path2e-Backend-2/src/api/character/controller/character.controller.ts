import { Body, Controller, Get, Post } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';
import { CharacterService } from '../service/character.service';

@Controller('api/character')
export class CharacterController {
    constructor(private service: CharacterService) {}

    @Get()
    async getCharacters(@Query('user') user: string) {
        const characters = await this.service.findCharacters(user);
        return characters;
    }

    @Post()
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.service.createCharacter(createCharacterDto);
    }
}
