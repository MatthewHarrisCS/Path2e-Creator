import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ancestry } from 'src/schemas/ancestry';

@Injectable()
export class AncestryService {

    constructor(
        @InjectModel(Ancestry.name) private model: Model<Ancestry>
    ) {}

    findAncestries() {
        return this.model.find();
    }
}