import { Controller, Get } from '@nestjs/common';
import { HeritageService } from '../service/heritage.service';

@Controller('api/heritage')
export class HeritageController {
    constructor(private service: HeritageService) {}

    @Get()
    async getHeritages() {
        const heritages = await this.service.findHeritages();
        return heritages;
    }
}
