import { Column, Entity } from "typeorm";

@Entity("cl_")
export class CountryEntity{

    @Column({primary: true, generated : true})
    id_pais:number;

    @Column("text")
    codigo:string;

    @Column("text")
    nombre:string;
}