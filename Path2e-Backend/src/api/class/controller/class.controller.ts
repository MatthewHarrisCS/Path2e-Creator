import { Controller, Get } from '@nestjs/common';
import { ClassService } from '../service/class.service';

@Controller('api/class')
export class ClassController {
    constructor(private service: ClassService) {}

    @Get()
    async getClasses() {
        const classes = await this.service.findClasses();
        return classes;
    }
}
