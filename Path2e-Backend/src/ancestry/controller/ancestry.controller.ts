import { Controller, Get, Post } from '@nestjs/common';
import { AncestryService } from '../service/ancestry.service';

@Controller('ancestry')
export class AncestryController {
    constructor(private service: AncestryService) {}

    @Get()
    async getAncestries() {
        const ancestries = await this.service.findAncestries();
        return ancestries;
    }
}
