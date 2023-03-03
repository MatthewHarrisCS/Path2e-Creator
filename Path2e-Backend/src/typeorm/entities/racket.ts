import { IsAlphanumeric } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { ValidStat } from "../validators/validStat";

@Entity({ name: 'racket' } )
export class Racket {

    @PrimaryColumn("varchar", { length: 16 })
    @IsAlphanumeric()
    name: string;

    @Column("varchar", { length: 32, nullable: true })
    @IsAlphanumeric()
    train1: string;
    
    @Column("varchar", { length: 32, nullable: true })
    @IsAlphanumeric()
    train2: string;

    @Column("varchar", { length: 12, nullable: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility: string;
}