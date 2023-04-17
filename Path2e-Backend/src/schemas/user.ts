import { isAlphanumeric, isEmail } from "class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true, unique: true, validator: isEmail })
    email: string;

    @Prop({ required: true, validator: isAlphanumeric })
    username: string;

    @Prop({ required: true, unique: true, 
        default: function() {
            return this.username.toLowerCase();
        } })
    lowercase: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);