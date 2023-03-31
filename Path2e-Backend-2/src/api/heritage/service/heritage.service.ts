import { Injectable } from '@nestjs/common';
import { Heritage } from 'src/typeorm/entities/heritage';
import { Repository } from 'typeorm';

@Injectable()
export class HeritageService {

    constructor(
    ) {}

    findHeritages() {
    }
}
