import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as base from 'src/base-db';
import { Ancestry } from 'src/schemas/ancestry';
import { Background } from 'src/schemas/background';
import { CharacterSheet } from 'src/schemas/characterSheet';
import { Class } from 'src/schemas/class';
import { Heritage } from 'src/schemas/heritage';
import { Racket } from 'src/schemas/racket';

@Injectable()
export class DebugService {

    constructor(
        @InjectModel(Ancestry.name) private ancestryModel: Model<Ancestry>,
        @InjectModel(Background.name) private backgroundModel: Model<Background>,
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(Heritage.name) private heritageModel: Model<Heritage>,
        @InjectModel(Racket.name) private racketModel: Model<Racket>,
        @InjectModel(CharacterSheet.name) private characterModel: Model<CharacterSheet>
    ) {}

    populateDatabases() {
        this.ancestryModel.insertMany(base.ANCESTRY_LIST);
        this.backgroundModel.insertMany(base.BACKGROUND_LIST);
        this.classModel.insertMany(base.CLASS_LIST);
        this.heritageModel.insertMany(base.HERITAGE_LIST);
        return this.racketModel.insertMany(base.RACKET_LIST);
    }
}
