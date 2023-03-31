import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Background } from 'src/typeorm/entities/background';
import { Repository } from 'typeorm';

@Injectable()
export class BackgroundService {

    constructor(
        @InjectRepository(Background) private backgrounds: Repository<Background>,
    ) {}

    findBackgrounds() {
        return this.backgrounds.find();
    }
}
