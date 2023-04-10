import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Racket } from 'src/schemas/racket';

@Injectable()
export class RacketService {

    constructor(
        @InjectModel(Racket.name) private rackets: Model<Racket>
    ) {}

    findRackets() {
        return this.rackets.find();
    }
}
