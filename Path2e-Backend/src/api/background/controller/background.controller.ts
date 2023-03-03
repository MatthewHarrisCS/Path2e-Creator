import { Controller, Get } from '@nestjs/common';
import { BackgroundService } from '../service/background.service';

@Controller('api/background')
export class BackgroundController {
    constructor(private service: BackgroundService) {}

    @Get()
    async getBackgrounds() {
        const backgrounds = await this.service.findBackgrounds();
        return backgrounds;
    }
}
