import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Racket } from 'src/typeorm/entities/racket';
import { Repository } from 'typeorm';

@Injectable()
export class RacketService {

    constructor(
        @InjectRepository(Racket) private rackets: Repository<Racket>,
    ) {}

    findRackets() {
        return this.rackets.find();
    }
}
