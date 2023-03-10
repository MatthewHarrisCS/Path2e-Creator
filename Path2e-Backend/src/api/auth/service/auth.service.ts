import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private users: Repository<User>,
    ) {}

    getUser(email: string) {
        return this.users.findOneBy({
            email: email
        });
    }
}
