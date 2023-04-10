import { ISession } from "connect-typeorm";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema({})
export class Session implements ISession {
    
    @Prop({ required: true })
    public expiredAt = Date.now();

    @Prop({ required: true })
    public id = "";

    @Prop({ required: true })
    public json = "";

    @Prop({ required: true })
    public destroyedAt?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);