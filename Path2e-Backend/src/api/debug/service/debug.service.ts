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
        @InjectModel(Ancestry.name) private ancestries: Model<Ancestry>,
        @InjectModel(Background.name) private backgrounds: Model<Background>,
        @InjectModel(Class.name) private classes: Model<Class>,
        @InjectModel(Heritage.name) private heritages: Model<Heritage>,
        @InjectModel(Racket.name) private rackets: Model<Racket>,
        @InjectModel(CharacterSheet.name) private characters: Model<CharacterSheet>
    ) {}

    populateDatabases() {
        this.ancestries.insertMany(base.ANCESTRY_LIST);
        this.backgrounds.insertMany(base.BACKGROUND_LIST);
        this.classes.insertMany(base.CLASS_LIST);
        this.heritages.insertMany(base.HERITAGE_LIST);
        return this.rackets.insertMany(base.RACKET_LIST);
    }
}
