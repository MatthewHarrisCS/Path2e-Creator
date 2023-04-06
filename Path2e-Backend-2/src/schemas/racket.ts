import { isAlphanumeric } from "class-validator";
import { validStat } from "src/validators/validStat";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RacketDocument = HydratedDocument<Racket>;

@Schema()
export class Racket {

    @Prop({ required: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, validator: isAlphanumeric })
    train1: string;
    
    @Prop({ required: true, validator: isAlphanumeric })
    train2: string;

    @Prop({ required: true, validator: validStat })
    keyAbility: string;
}