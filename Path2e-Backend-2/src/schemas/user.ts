import { IsAlphanumeric, IsEmail } from "class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    username: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);