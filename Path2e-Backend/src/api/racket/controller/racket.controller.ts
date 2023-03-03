import { Controller, Get } from '@nestjs/common';
import { RacketService } from '../service/racket.service';

@Controller('api/racket')
export class RacketController {
    constructor(private service: RacketService) {}

    @Get()
    async getRackets() {
        const rackets = await this.service.findRackets();
        return rackets;
    }
}
