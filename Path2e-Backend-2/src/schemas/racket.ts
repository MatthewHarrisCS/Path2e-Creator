import { isAlphanumeric } from "class-validator";
import { validStat } from "src/validators/validStat";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RacketDocument = HydratedDocument<Racket>;

@Schema({_id: false})
export class Racket {

    @Prop({ required: true, unique: true, validator: isAlphanumeric })
    name: string;

    @Prop({ validator: isAlphanumeric })
    train1: string;
    
    @Prop({ validator: isAlphanumeric })
    train2: string;

    @Prop({ validator: validStat })
    keyAbility: string;
}

export const RacketSchema = SchemaFactory.createForClass(Racket);