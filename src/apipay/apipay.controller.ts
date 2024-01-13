import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApipayService } from './apipay.service';
import { CreateApipayDto } from './dto/create-apipay.dto';
import { UpdateApipayDto } from './dto/update-apipay.dto';
import { LoginDto } from './dto/login.dto';
import { PaymentMethodDto } from './dto/payment-method.dto';

@Controller('data')
export class ApipayController {
  constructor(private readonly apipayService: ApipayService) {}

  // @Post()
  // create(@Body() createApipayDto: CreateApipayDto) {
  //   return this.apipayService.create(createApipayDto);
  // }

  // @Post('session-login-upload-file')
  // getAllLoginSesion(@Body()body:LoginDto) {
  //   const login = body.login;
  //   console.log(login);
  //   return this.apipayService.getAllLoginSesion(login);
  // }

  @Post('payment-method')
  getAllPaymentMethod(@Body()body:LoginDto){
    const login = body.login;
    return this.apipayService.getAllPaymentMethod(login);
  }


  //@Get('payment-method')
  //getOnePaymentMethod() {
   // return this.apipayService.getOnePaymentMethod();
  //}

  // @Get(':id')
  // getPaymentMethodById(@Param('id') id):PaymentMethodDto {
  //   return this.apipayService.getPaymentMethodById(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.apipayService.remove(+id);
  // }

}


// const dbConfig = {
//   type: 'mysql',
//   host: 'itam-db-developer.mysql.database.azure.com',
//   port: parseInt(process.env.DB_PORT),
//   username: 'itam-app@itam-db-developer',
//   password: 'Itam1003.,',
//   database: process.env.DB_NAME,
//   //autoLoadEntities: true,
//   //synchronize: true,
// }

// console.log(dbConfig);
