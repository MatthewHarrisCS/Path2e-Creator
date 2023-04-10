import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Heritage } from 'src/schemas/heritage';

@Injectable()
export class HeritageService {

    constructor(
        @InjectModel(Heritage.name) private heritages: Model<Heritage>
    ) {}

    findHeritages() {
        return this.heritages.find();
    }
}
