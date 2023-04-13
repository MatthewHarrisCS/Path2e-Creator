import { Types } from "mongoose";

export class SessionDto {
    _id: Types.ObjectId;
    username: string;
}