import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Min } from "class-validator";
import { HydratedDocument } from 'mongoose';
import { ValidStat } from 'src/validators/validStat';

export type AncestryDocument = HydratedDocument<Ancestry>;

@Schema()
export class Ancestry {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    @Min(0)
    hp: number;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    @Min(0)
    speed: number;

    @Prop({ required: true })
    @ValidStat()
    boost1: string;

    @Prop({ required: true })
    @ValidStat()
    boost2: string;

    @Prop({ required: true })
    @ValidStat()
    flaw: string;
}

export const AncestrySchema = SchemaFactory.createForClass(Ancestry);