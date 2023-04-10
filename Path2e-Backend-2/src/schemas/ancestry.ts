import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isAlphanumeric } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { validStat } from 'src/validators/validStat';

export type AncestryDocument = HydratedDocument<Ancestry>;

@Schema({_id: false})
export class Ancestry {

    @Prop({ required: true, unique: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, min: 0 })
    hp: number;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true, min: 0 })
    speed: number;

    @Prop({ validator: validStat })
    boost1: string;

    @Prop({ validator: validStat })
    boost2: string;

    @Prop({ validator: validStat })
    flaw: string;
}

export const AncestrySchema = SchemaFactory.createForClass(Ancestry);