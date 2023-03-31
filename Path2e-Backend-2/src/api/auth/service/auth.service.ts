import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/user';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class AuthService {

    constructor(
    ) {}

    // getUserByEmail(): Return a user from the database if 
    //                   an entry exists with the given email
    getUserByEmail(email: string) {
        //
        //
        // TEMP _ REBUILD THE SERVICES WITH MONGODB
        //
        //

        return {
            email: "test@temporary.com",
            username: "TempUser",
            password: "$2b$12$Jsfyb.K/t3gZVHca3L5gpuyT3mcK7qXl3VB2/5shTxRO8CDZotF9u" /* hellothere */
        }
    }

    // findUser(): Return a user from the database if an entry
    //             exists with the given email OR username
    findUser(body: CreateUserDto) {
    }

    // createUser(): Insert the provided user into the database 
    createUser(body: CreateUserDto) {
    }
}
