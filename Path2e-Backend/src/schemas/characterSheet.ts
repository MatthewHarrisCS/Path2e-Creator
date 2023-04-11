import { isAlphanumeric, isEmail } from "class-validator";
import { Ancestry } from "./ancestry";
import { Background } from "./background";
import { Class } from "./class";
import { Heritage } from "./heritage";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Racket } from "./racket";

export type CharacterDocument = HydratedDocument<CharacterSheet>;
export type StatsDocument = HydratedDocument<Stats>;

@Schema({_id: false})
export class Stats {

    @Prop({ required: true, min: 12 })
    hp: number;
    
    @Prop({ required: true, min: 8 })
    str: number;
    
    @Prop({ required: true, min: 8 })
    dex: number;
    
    @Prop({ required: true, min: 8 })
    con: number;
    
    @Prop({ required: true, min: 8 })
    itl: number;
    
    @Prop({ required: true, min: 8 })
    wis: number;
    
    @Prop({ required: true, min: 8 })
    cha: number;
}

@Schema()
export class CharacterSheet {

    @Prop({ required: true, unique: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, validator: isEmail })
    user: string;

    @Prop({ required: true, default: true, min: 1, max: 60 })
    level: number = 1;

    @Prop({ required: true })
    ancestry: Ancestry;

    @Prop({ required: true })
    background: Background; 

    @Prop({ required: true })
    gameClass: Class;

    @Prop({ required: true })
    heritage: Heritage

    @Prop()
    racket: Racket

    @Prop({ required: true })
    stats: Stats;
    
    @Prop({ required: true })
    backgroundChoice: boolean;
    
    @Prop({ required: true })
    gameClassChoice: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(CharacterSheet);