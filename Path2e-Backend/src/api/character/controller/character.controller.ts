import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Query, UseGuards } from '@nestjs/common/decorators';
import { CreateCharacterDto } from '../dtos/createCharacter.dto';
import { CharacterService } from '../service/character.service';
import { LocalSessionGuard } from 'src/api/auth/utils/local-guards';
import { Types } from 'mongoose';

@Controller('api/character')
export class CharacterController {
    constructor(private service: CharacterService) {}

    @UseGuards(LocalSessionGuard)
    @Get()
    async getCharacters(@Query('user') user: string) {
        const characters = await this.service.findCharacters(user);
        return characters;
    }

    @UseGuards(LocalSessionGuard)
    @Post()
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.service.createCharacter(createCharacterDto);
    }

    @UseGuards(LocalSessionGuard)
    @Delete()
    async deleteCharacter(@Body() body: string) {
        const _id = new Types.ObjectId(body);
        await this.service.deleteCharacter(_id);
    }
}
