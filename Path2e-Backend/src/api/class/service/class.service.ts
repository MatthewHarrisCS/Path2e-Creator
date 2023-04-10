import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from 'src/schemas/class';

@Injectable()
export class ClassService {

    constructor(
        @InjectModel(Class.name) private classes: Model<Class>
    ) {}

    findClasses() {
        return this.classes.find();
    }
}
