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

    login(loginDto: LoginDto) {
        return this.users.findOneBy({
            email: loginDto.email,
            password: loginDto.password
        });
    }
}
