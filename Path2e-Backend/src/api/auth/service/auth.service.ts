import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user';
import { CreateUserDto } from '../dtos/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private users: Model<User>
    ) {}

    // getUserByEmail(): Return a user from the database if 
    //                   an entry exists with the given email
    getUserByEmail(email: string) {
        return this.users.findOne({ email: email });
    }

    // getUserById(): Return a user from the database if 
    //                an entry exists with the given _id
    getUserById(_id: Types.ObjectId) {
        const user = this.users.findOne({ _id: _id });
        return user;
    }

    // findUser(): Return a user from the database if an entry
    //             exists with the given email OR username
    findUser(body: CreateUserDto) {
        return this.users.findOne({$or:[
            { email: body.email },
            { username: body.username }]});
    }

    // createUser(): Insert the provided user into the database 
    createUser(body: CreateUserDto) {
        const newUser = this.users.create(body);
        return newUser;
    }
}