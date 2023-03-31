import { Injectable } from '@nestjs/common';
import { Class } from 'src/typeorm/entities/class';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {

    constructor(
    ) {}

    findClasses() {
    }
}
