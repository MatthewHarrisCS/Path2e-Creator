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

    // getUserById(): Return a user from the database if 
    //                an entry exists with the given _id
    getUserById(_id: Types.ObjectId) {
        return this.users.findOne({ _id: _id });
    }

    // getUserByEmail(): Return a user from the database if 
    //                   an entry exists with the given email
    getUserByEmail(email: string) {
        return this.users.findOne({ email: email });
    }

    // getUserByUsername(): Return a user from the database if an
    //                      entry exists with the given username
    getUserByUsername(username: string) {
        return this.users.findOne({ username: username });
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
        return this.users.create(body);
    }

    updateUser(_id: Types.ObjectId, param: any) {
        return this.users.findByIdAndUpdate(_id, param);
    }
}