import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsAlphanumeric, IsEmail, MinLength, NotContains } from "class-validator";

@Entity({ name: 'user' } )
export class User {

    @PrimaryColumn("varchar", { length: 64})
    @IsEmail()
    email: string;

    @Column("varchar", { length: 32, unique: true })
    @IsAlphanumeric()
    username: string;

    @Column("char", { length: 60 })
    password: string;
}