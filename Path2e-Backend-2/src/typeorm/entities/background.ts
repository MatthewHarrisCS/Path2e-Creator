import { IsAlphanumeric } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { ValidStat } from "../validators/validStat";

@Entity({ name: 'background' } )
export class Background {

    @PrimaryColumn("varchar", { length: 16 })
    @IsAlphanumeric()
    name: string;

    @Column("varchar", { length: 64 })
    @IsAlphanumeric()
    feat: string;

    @Column("varchar", { length: 12 })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility1: string;

    @Column("varchar", { length: 12 })
    @IsAlphanumeric()
    @ValidStat()
    keyAbility2: string;
}