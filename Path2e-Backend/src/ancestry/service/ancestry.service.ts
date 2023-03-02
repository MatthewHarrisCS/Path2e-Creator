import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ancestry } from 'src/typeorm/entities/ancestry';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AncestryService {

    constructor(
        @InjectRepository(Ancestry) private ancestries: Repository<Ancestry>,
    ) {}

    findAncestries() {
        return this.ancestries.find();
    }
}