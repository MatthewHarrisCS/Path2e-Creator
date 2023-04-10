import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { isAlphanumeric } from "class-validator";

export type HeritageDocument = HydratedDocument<Heritage>;

@Schema()
export class Heritage {

    @Prop({ required: true, validator: isAlphanumeric })
    name: string;

    @Prop({ required: true, validator: isAlphanumeric })
    ancestryName: string;

}

export const HeritageSchema = SchemaFactory.createForClass(Heritage);