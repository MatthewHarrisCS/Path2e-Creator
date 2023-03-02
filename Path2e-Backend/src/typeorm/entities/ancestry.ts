import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsAlphanumeric, IsEmail, MinLength, NotContains } from "class-validator";

@Entity({ name: 'ancestry' } )
export class Ancestry {

    @PrimaryColumn("varchar", { length: 16})
    name: string;

    @Column("int")
    hp: number;
}