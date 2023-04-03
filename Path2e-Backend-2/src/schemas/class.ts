import { IsAlphanumeric, Min } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ValidStat } from "src/validators/validStat";

export type ClassDocument = HydratedDocument<Class>;

@Schema()
export class Class {

    @Prop({ required: true })
    @IsAlphanumeric()
    name: string;

    @Prop({ required: true })
    @Min(6)
    hp: number;

    @Prop({ required: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility1: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility2: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);