import { isAlphanumeric } from "class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { validStat } from "src/validators/validStat";

export type ClassDocument = HydratedDocument<Class>;

@Schema({_id: false})
export class Class {

    @Prop({ required: true, unique: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, min: 6 })
    hp: number;

    @Prop({ required: true, validator: validStat })
    keyAbility1: string;

    @Prop({ validator: validStat }) 
    keyAbility2: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);