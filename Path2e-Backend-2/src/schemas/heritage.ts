import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Ancestry } from "./ancestry";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HeritageDocument = HydratedDocument<Heritage>;

@Schema()
export class Heritage {

    @PrimaryColumn("varchar", { length: 16 })
    name: string;
    
    @ManyToOne(() => Ancestry, (ancestry) => ancestry.name, {
        onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false
    })
    @JoinColumn({ name: "ancestry"})
    @PrimaryColumn("varchar", { length: 16 })
    ancestry: string;
}