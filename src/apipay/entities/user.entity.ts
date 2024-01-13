import { Column, Entity } from "typeorm";


@Entity("cl_usuario")
export class UserEntity {


    @Column({primary: true, generated : true})
    id_usuario:number;

    // code:string;

    @Column("text")
    nombre:string;

    // imageUrl:string;
}