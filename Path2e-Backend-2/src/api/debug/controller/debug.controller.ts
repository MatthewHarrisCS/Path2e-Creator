import { Controller, Get } from '@nestjs/common';
import { DebugService } from '../service/debug.service';

@Controller('api/debug')
export class DebugController {
    constructor(private service: DebugService) {}

    @Get('/reset')
    async resetDatabases() {
        const success = await this.service.resetDatabases();
        return success;
    }
}
