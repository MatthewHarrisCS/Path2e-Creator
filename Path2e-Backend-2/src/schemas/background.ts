import { IsAlphanumeric } from "class-validator";
import { ValidStat } from "src/validators/validStat";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BackgroundDocument = HydratedDocument<Background>;

@Schema()
export class Background {

    @Prop({ required: true })
    @IsAlphanumeric()
    name: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    feat: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility1: string;

    @Prop({ required: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility2: string;
}

export const BackgroundSchema = SchemaFactory.createForClass(Background);