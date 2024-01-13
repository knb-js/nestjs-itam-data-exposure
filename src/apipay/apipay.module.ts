import { Module } from '@nestjs/common';
import { ApipayService } from './apipay.service';
import { ApipayController } from './apipay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { UserEntity } from './entities/user.entity';
import { CompanyEntity } from './entities/company.entity';
import { LocalEntity } from './entities/local.entity';
import { CountryEntity } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodEntity, UserEntity, CompanyEntity, LocalEntity, CountryEntity])],
  controllers: [ApipayController],
  providers: [ApipayService],
})

export class ApipayModule {}
