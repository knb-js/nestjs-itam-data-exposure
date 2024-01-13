import { IsString } from "class-validator";
import { IsOptional } from "class-validator";
import { PaymentMethodDto } from "./payment-method.dto";

export class CompanyDto {
    
    @IsString()
    id:string;

    @IsString()
    code:string;

    @IsString()
    name:string;

    @IsString()
    imageUrl:string;
    
    @IsOptional()
    paymentMethods:PaymentMethodDto[];
}