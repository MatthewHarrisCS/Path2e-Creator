import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Background } from 'src/schemas/background';

@Injectable()
export class BackgroundService {

    constructor(
        @InjectModel(Background.name) private model: Model<Background>
    ) {}

    findBackgrounds() {
        return this.model.find();
    }
}
