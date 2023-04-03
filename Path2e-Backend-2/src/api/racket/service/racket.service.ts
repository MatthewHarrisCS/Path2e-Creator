import { Injectable } from '@nestjs/common';
import { Racket } from 'src/schemas/racket';
import { Repository } from 'typeorm';

@Injectable()
export class RacketService {

    constructor(
    ) {}

    findRackets() {
    }
}
