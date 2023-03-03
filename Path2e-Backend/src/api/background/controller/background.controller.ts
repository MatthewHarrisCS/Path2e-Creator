import { Controller, Get } from '@nestjs/common';
import { BackgroundService } from '../service/background.service';

@Controller('background')
export class BackgroundController {
    constructor(private service: BackgroundService) {}

    @Get()
    async getBackgrounds() {
        const backgrounds = await this.service.findBackgrounds();
        return backgrounds;
}
}
