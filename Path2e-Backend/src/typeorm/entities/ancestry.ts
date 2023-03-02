import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsAlphanumeric, IsEmail, Min, MinLength, NotContains } from "class-validator";
import { ValidStat } from "../validators/validStat";

@Entity({ name: 'ancestry' } )
export class Ancestry {

    @PrimaryColumn("varchar", { length: 16 })
    name: string;

    @Column("int")
    @Min(0)
    hp: number;

    @Column("varchar", { length: 16 })
    size: string; // IMPLEMENT size enum values

    @Column("int")
    @Min(0)
    speed: number;

    @Column("varchar", { length: 12, nullable: true })
    @ValidStat()
    boost1: string;

    @Column("varchar", { length: 12, nullable: true })
    @ValidStat()
    boost2: string;

    @Column("varchar", { length: 12, nullable: true })
    @ValidStat()
    flaw: string;
}