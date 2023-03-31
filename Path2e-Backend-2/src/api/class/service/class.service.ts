import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/typeorm/entities/class';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {

    constructor(
        @InjectRepository(Class) private classes: Repository<Class>,
    ) {}

    findClasses() {
        return this.classes.find();
    }
}
