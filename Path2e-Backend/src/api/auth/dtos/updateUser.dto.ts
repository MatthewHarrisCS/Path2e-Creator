import { Types } from "mongoose";

export class UpdateUserDto {
    _id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
}