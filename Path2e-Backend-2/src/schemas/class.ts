import { isAlphanumeric, Min } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { validStat } from "src/validators/validStat";

export type ClassDocument = HydratedDocument<Class>;

@Schema()
export class Class {

    @Prop({ required: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, min: 6 })
    hp: number;

    @Prop({ required: true, validator: validStat })
    keyAbility1: string;

    @Prop({ required: true, validator: validStat })
    keyAbility2: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);