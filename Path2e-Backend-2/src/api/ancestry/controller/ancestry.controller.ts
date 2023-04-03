import { Controller, Get } from '@nestjs/common';
import { AncestryService } from '../service/ancestry.service';

@Controller('api/ancestry')
export class AncestryController {
    constructor(private service: AncestryService) {}

    @Get()
    async getAncestries() {
        const ancestries = await this.service.findAncestries();
        return ancestries;
    }
    
    @Get('/reset')
    async resetAncestries() {
        const success = await this.service.resetAncestries();
    }
}
