import { Controller, Get } from '@nestjs/common';
import { DebugService } from '../service/debug.service';

@Controller('api/debug')
export class DebugController {
    constructor(private service: DebugService) {}

    @Get('/reset')
    async populateDatabases() {
        const success = await this.service.populateDatabases();
        return success;
    }
}
