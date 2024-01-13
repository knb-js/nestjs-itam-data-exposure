import { Column, Entity } from "typeorm";

@Entity("cl_local")
export class LocalEntity{

    @Column({primary: true, generated : true})
    id_local:number;

    @Column("text")
    codigo:string;

    @Column("text")
    nombre:string;
}