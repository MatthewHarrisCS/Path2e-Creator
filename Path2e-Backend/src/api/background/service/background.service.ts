import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Background } from 'src/schemas/background';

@Injectable()
export class BackgroundService {

    constructor(
        @InjectModel(Background.name) private backgrounds: Model<Background>
    ) {}

    findBackgrounds() {
        return this.backgrounds.find();
    }
}
