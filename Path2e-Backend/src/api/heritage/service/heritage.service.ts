import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Heritage } from 'src/typeorm/entities/heritage';
import { Repository } from 'typeorm';

@Injectable()
export class HeritageService {

    constructor(
        @InjectRepository(Heritage) private heritages: Repository<Heritage>,
    ) {}

    findHeritages() {
        return this.heritages.find();
    }
}
