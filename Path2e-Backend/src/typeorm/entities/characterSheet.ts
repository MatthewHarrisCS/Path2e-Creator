import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IsAlphanumeric, IsEmail, Min, MinLength, NotContains } from "class-validator";
import { User } from "./user";
import { Ancestry } from "./ancestry";
import { Background } from "./background";
import { Class } from "./class";

@Entity({ name: 'charactersheet' } )
export class CharacterSheet {

    @PrimaryColumn("varchar", { length: 32 })
    @IsAlphanumeric()
    name: string;

    @ManyToOne(() => User, (user) => user.email, {
        onDelete: "CASCADE", onUpdate: "CASCADE"
    })
    @JoinColumn({ name: "user" })
    @PrimaryColumn("varchar", { length: 64 })
    user: string;

    @ManyToOne(() => Ancestry, (ancestry) => ancestry.name, {
        onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false
    })
    @JoinColumn({ name: "ancestry"}) 
    ancestry: string;

    @ManyToOne(() => Background, (background) => background.name, {
        onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false
    })
    @JoinColumn({ name: "background" })
    background: string; 

    @ManyToOne(() => Class, (gameClass) => gameClass.name, {
        onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false
    })
    @JoinColumn({ name: "class" })
    gameClass: string;

    @Column("int") 
    @Min(12) 
    hp: number;
    
    @Column("int")
    @Min(10)
    str: number;
    
    @Column("int")
    @Min(10)
    dex: number;
    
    @Column("int")
    @Min(10)
    con: number;
    
    @Column("int")
    @Min(10)
    itl: number;
    
    @Column("int")
    @Min(10)
    wis: number;
    
    @Column("int")
    @Min(10)
    cha: number;
}