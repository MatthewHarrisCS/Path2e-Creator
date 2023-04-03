import { IsAlphanumeric } from "class-validator";
import { ValidStat } from "src/validators/validStat";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RacketDocument = HydratedDocument<Racket>;

@Schema()
export class Racket {

    @Prop({ required: true })
    @IsAlphanumeric()
    name: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    train1: string;
    
    @Prop({ required: true })
    @IsAlphanumeric()
    train2: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility: string;
}