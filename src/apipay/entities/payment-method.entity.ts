import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("cl_emisor")
export class PaymentMethodEntity {


    @Column({primary: true, generated : true})
    id:number;

    // code:string;

    @Column("text")
    nombre:string;

    // imageUrl:string;
}