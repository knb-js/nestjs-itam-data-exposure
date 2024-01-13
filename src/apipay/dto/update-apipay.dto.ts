import { PartialType } from '@nestjs/mapped-types';
import { CreateApipayDto } from './create-apipay.dto';

export class UpdateApipayDto extends PartialType(CreateApipayDto) {}
