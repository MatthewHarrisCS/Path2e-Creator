import { Injectable } from '@nestjs/common';
import { Ancestry } from 'src/typeorm/entities/ancestry';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AncestryService {

    constructor(
    ) {}

    findAncestries() {
    }
}