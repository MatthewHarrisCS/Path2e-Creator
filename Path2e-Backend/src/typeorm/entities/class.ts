import { IsAlphanumeric, Min } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { ValidStat } from "../validators/validStat";

@Entity({ name: 'class' } )
export class Class {

    @PrimaryColumn("varchar", { length: 16 })
    @IsAlphanumeric()
    name: string;

    @Column("int")
    @Min(6)
    hp: number;

    @Column("varchar", { length: 12 })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility1: string;

    @Column("varchar", { length: 12, nullable: true })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility2: string;
}