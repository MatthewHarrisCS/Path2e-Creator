import { isAlphanumeric } from "class-validator";
import { validStat } from "src/validators/validStat";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BackgroundDocument = HydratedDocument<Background>;

@Schema({_id: false })
export class Background {

    @Prop({ required: true, unique: true, validator: isAlphanumeric })
    name: string;

    @Prop({ validator: isAlphanumeric })
    feat: string;

    @Prop({ required: true, validator: validStat })
    keyAbility1: string;

    @Prop({ validator: validStat })
    keyAbility2: string;
}

export const BackgroundSchema = SchemaFactory.createForClass(Background);