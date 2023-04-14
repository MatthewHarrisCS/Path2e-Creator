import { isAlphanumeric } from "class-validator";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

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

    @Prop({ required: true })
    user: string;

    @Prop({ required: true, default: true, min: 1, max: 60 })
    level: number = 1;

    @Prop({ required: true, ref: "Ancestry" })
    ancestry: Types.ObjectId;

    @Prop({ required: true, ref: "Background" })
    background: Types.ObjectId;

    @Prop({ required: true, ref: "Class" })
    gameClass: Types.ObjectId;

    @Prop({ required: true, ref: "Heritage" })
    heritage: Types.ObjectId;
    
    @Prop({ ref: "Racket"})
    racket: Types.ObjectId;
    
    @Prop({ required: true })
    stats: Stats;
    
    @Prop({ required: true })
    backgroundChoice: boolean;
    
    @Prop({ required: true })
    gameClassChoice: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(CharacterSheet);