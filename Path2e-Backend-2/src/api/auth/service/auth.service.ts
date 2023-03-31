import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private users: Repository<User>,
    ) {}

    // getUserByEmail(): Return a user from the database if 
    //                   an entry exists with the given email
    getUserByEmail(email: string) {
        return this.users.findOneBy({
            email: email
        });
    }

    // findUser(): Return a user from the database if an entry
    //             exists with the given email OR username
    findUser(body: CreateUserDto) {
        return this.users.findOneBy([
            {email: body.email},
            {username: body.username}
        ]);
    }

    // createUser(): Insert the provided user into the database 
    createUser(body: CreateUserDto) {
        const newUser = this.users.create(body);
        const saveUser = this.users.insert(newUser);
        return saveUser;
    }
}
