import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Ancestry } from "./ancestry";

@Entity({ name: 'heritage' } )
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