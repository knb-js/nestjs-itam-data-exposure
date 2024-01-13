import { Column, Entity } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("cl_empresa")
export class CompanyEntity{

    @Column({primary: true, generated : true})
    id_empresa:number;

    @Column("text")
    codigo:string;

    @Column("text")
    user:string;
    
    
}
// const clase = [{
//     private String idEmpresa;
//     private String user;
//     private String codigo;
//     private String nombre;
//     private String activo;
//     private String orderBy;
//     private String login;
//     private String token;
//     private String rut;
//     private String bitacora;
//     private String created;
//     private String updated;
//     private Pais pais;
//     private String urlImagen;
//     private String diasRetencion;
//     private Organizacion org;
//     private String codigoPais;
// } ]