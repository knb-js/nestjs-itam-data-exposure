import { Injectable } from '@nestjs/common';
import { CreateApipayDto } from './dto/create-apipay.dto';
import { UpdateApipayDto } from './dto/update-apipay.dto';
import { PaymentMethodDto } from './dto/payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryDto } from './dto/country.dto';
import { Repository } from 'typeorm';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { UserEntity } from './entities/user.entity';
import { CompanyEntity } from './entities/company.entity';
import { CountryEntity } from './entities/country.entity';
import { LocalEntity } from './entities/local.entity';

@Injectable()
export class ApipayService {


  constructor(
    // @InjectRepository(CountryDto)
    // private readonly countryRepository :Repository<CountryDto>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,

    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodEntityRepository: Repository<PaymentMethodEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyEntityRepository: Repository<CompanyEntity>,

    @InjectRepository(CountryEntity)
    private readonly countryEntityRepository: Repository<CountryEntity>,

    @InjectRepository(LocalEntity)
    private readonly localEntityRepository: Repository<LocalEntity>,

  ) { }

  //   create(createApipayDto: CreateApipayDto) {
  //     return 'This action adds a new apipay';
  //   }

  //   async getAllLoginSesion(name) {
  //     const row = await this.countryRepository.query(
  //     "SELECT * from cl_usuario");
  //     console.log(row);
  //     return await this.countryRepository.find(name);
  //   }

  //getOnePaymentMethod():PaymentMethodDto {
  //return PAYMENT_METHOD_DATA;
  // }

  //   getPaymentMethodById(id: string) {
  //     return PAYMENT_METHOD_DATA.find((pay)=> pay.id === id);
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} apipay`;
  //   }

  //   async getAllPaymentMethod() {
  //     const row = await this.paymentMethodRepository.query(
  //     "SELECT * from cl_emisor");
  //     return row;
  //   }

  // }

  async getLogin(login) {

    return await this.userEntityRepository.query(
      ` SELECT us.id_usuario    as idUsuario,
    us.perfil               as 'perfilConciliacion',
    dp.dpr_valor            as 'nombrePerfilConciliacion',
    us.login                as login,
    us.passwd               as passwd,
    us.nombre               as nombre,
    us.super_usuario        as 'superUsuario',
    coalesce(us.codigo, '') as codigo,
    us.rut                  as rut,
    coalesce(us.email, '')  as email,
    us.id_perfilcdt         as 'perfilCuadratura.idPerfil',
    pe.nombre               as 'perfilCuadratura.nombre',
    us.activo               as activo,
    ultima_conexion         as ultima_conexion
    FROM cl_usuario us
      LEFT JOIN cdt_perfil pe ON pe.id = us.id_perfilcdt
      LEFT JOIN cl_dominio_param dp ON dp.dpr_codigo = us.perfil
    WHERE us.login LIKE BINARY '${login}'
    AND us.activo = 'S' `);

  }

  async getCompanyById(userId) {
    return await this.companyEntityRepository.query(
    ` SELECT uemp.id_emp_usr                                 AS 'idEmpUsr',
    em.id_empresa                                            AS 'idEmpresa',
    em.codigo                                                AS 'codigo',
    em.nombre                                                AS 'nombre',
    coalesce(replace(em.url_image, 'public', '200x200'), '') AS 'urlImagen',
    ps.codigo                                                AS 'pais.codigo'
    FROM cl_empresa em
      LEFT JOIN cl_pais ps ON ps.id_pais = em.id_pais
      LEFT JOIN cl_usuario_emp uemp ON uemp.id_empresa = em.id_empresa
      LEFT JOIN cl_app_empresa am ON am.id_empresa = em.id_empresa
      LEFT JOIN cl_app ap ON ap.id_app = am.id_app AND ap.activo = 'S'
    WHERE uemp.id_usuario = '${userId}'
    and ap.codigo is not null
    AND ap.codigo = '007' `);
  }

  async getPaymentById (){
    return await this.paymentMethodEntityRepository.query(
    ` SELECT DISTINCT rel.id_emisor                          AS idEmisor,
    em.codigo                                                AS 'codigo',
    Upper(em.nombre)                                         AS nombre,
    rel.id_empresa                                           AS 'empresa.idEmpresa',
    coalesce(replace(em.url_image, 'public', '200x200'), '') AS 'urlImagen'
    FROM cl_usuario_rel rel,
    cl_emisor em
    WHERE rel.id_usuario = ?
    AND em.id_emisor = rel.id_emisor
    AND em.activo = 'S'
    AND rel.tipo = 'M'
    AND rel.id_empresa IN (?, ?, ?, ?, ?) ` )
  }

  async getLocalById(){
    return await this.localEntityRepository.query(
      ` SELECT rel.id_local      AS idLocal,
      loc.codigo        AS 'codigo',
      emp.id_empresa    as 'empresa.idEmpresa',
      emp.codigo        as 'empresa.codigo',
      emp.nombre        as 'empresa.nombre',
      loc.nombre        as nombre,
      loc.codigo_origen as 'codigoOrigen',
      loc.direccion     as 'direccion',
      loc.activo        as 'activo',
      loc.created       as 'creado',
      loc.updated       as 'actualizado',
      loc.login         as 'usuario',
      sis.id_sistema    as 'sistema.idSistema',
      sis.codigo        as 'sistema.codigo',
      p.id_pais         as 'pais.idPais',
      p.nombre          as 'pais.nombre'
      FROM cl_usuario_rel rel
              LEFT JOIN cl_local loc ON loc.id_local = rel.id_local AND loc.activo = 'S'
              LEFT JOIN cl_empresa emp ON emp.id_empresa = loc.id_empresa AND emp.activo = 'S'
              LEFT JOIN cl_sistema sis ON sis.id_sistema = loc.id_sistema
              LEFT JOIN cl_pais p ON p.id_pais = loc.id_pais
      WHERE rel.id_usuario = ?
      AND rel.tipo = 'L'
      AND loc.id_empresa IN (?, ?, ?, ?, ?) ` )
  }

  async getAllCountryById(){
    return await this.countryEntityRepository.query(
    ` SELECT id_pais as idPais, codigo as codigo, nombre as nombre, activo as activo, orderby as orderBy, login as login
      FROM cl_pais
      WHERE activo = 'S'
      AND id_pais IN (SELECT DISTINCT loc.id_pais
                      FROM cl_local loc
                      WHERE id_local IN
                            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                             ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                             ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)) ` )
  }

  async getAllPaymentMethod(login): Promise<PaymentMethodDto[]> {


    const paymentMethodsRaw = await this.paymentMethodEntityRepository.query("SELECT * from cl_emisor");

    const users = await this.getLogin(login);

    console.log({users});

    const userByLogin = users.find(  item => item.login === login);
    
    console.log({userByLogin});

    const companyByUserId = await this.getCompanyById(userByLogin.idUsuario);

    console.log({companyByUserId});


    const paymentMethodsResponde = paymentMethodsRaw.map(pay => {

      const { id_emisor, nombre, codigo, url_image } = pay

      const objectDto = {

        id: id_emisor,

        name: nombre,

        code: codigo,

        imageUrl: url_image

      }

      

      return objectDto

    })
    

    return paymentMethodsResponde;

  }
}


// const DATA_RESPONSE_LOGIN = [
//   {
//       "id": "1",
//       "code": "CL",
//       "name": "Chile",
//       "imageUrl": "/assets/img/flags/CL.webp",
//       "companies": [
//           {
//               "id": "1",
//               "code": "1",
//               "name": "DEMO CHL",
//               "imageUrl": "",
//               "paymentMethods": [
//                   {
//                       "id": "1",
//                       "code": "TBK",
//                       "name": "TRANSBANK",
//                       "imageUrl": ""
//                   }
//               ]
//           },
//           {
//               "id": "1006",
//               "code": "7",
//               "name": "KNOP",
//               "imageUrl": "https://imagedelivery.net/S946yFz-65Is2pqgxwzkvg/d4e6977c-83de-49bb-f2b3-477b6a772400/200x200",
//               "paymentMethods": [
//                   {
//                       "id": "1014",
//                       "code": "TBK",
//                       "name": "TRANSBANK",
//                       "imageUrl": "https://imagedelivery.net/S946yFz-65Is2pqgxwzkvg/938e14d0-faff-445a-4d37-3c5b26523f00/200x200"
//                   },
//                   {
//                       "id": "1029",
//                       "code": "MPG",
//                       "name": "MERCADOPAGO",
//                       "imageUrl": ""
//                   },
//                   {
//                       "id": "1024",
//                       "code": "FPY",
//                       "name": "FPAY",
//                       "imageUrl": ""
//                   }
//               ]
//           },
//           {
//               "id": "1010",
//               "code": "SB",
//               "name": "SalcoBrand",
//               "imageUrl": "",
//               "paymentMethods": [
//                   {
//                       "id": "10050",
//                       "code": "H2C",
//                       "name": "TRANSBANK H2C",
//                       "imageUrl": ""
//                   },
//                   {
//                       "id": "10051",
//                       "code": "H2D",
//                       "name": "TRANSBANK H2D",
//                       "imageUrl": ""
//                   },
//                   {
//                       "id": "1018",
//                       "code": "TBK",
//                       "name": "TRANSBANK",
//                       "imageUrl": ""
//                   }
//               ]
//           },
//           {
//               "id": "2054",
//               "code": "4",
//               "name": "TEST APIPAY",
//               "imageUrl": "",
//               "paymentMethods": []
//           }
//       ]
//   },
//   {
//       "id": "2",
//       "code": "PE",
//       "name": "Perú",
//       "imageUrl": "/assets/img/flags/PE.webp",
//       "companies": [
//           {
//               "id": "1016",
//               "code": "SuperPet",
//               "name": "MASCOTAS LATINA",
//               "imageUrl": "",
//               "paymentMethods": []
//           }
//       ]
//   }
// ]

// const PAYMENT_METHOD_DATA = [{
//   "id": "1014",
//   "code": "TBK",
//   "name": "TRANSBANK",
//   "imageUrl": "https://imagedelivery.net/S946yFz-65Is2pqgxwzkvg/938e14d0-faff-445a-4d37-3c5b26523f00/200x200"
// }]
