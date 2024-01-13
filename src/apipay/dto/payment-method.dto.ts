import { IsString } from "class-validator";

export class PaymentMethodDto {
    
    @IsString()
    id:string;

    @IsString()
    code:string;

    @IsString()
    name:string;

    @IsString()
    imageUrl:string;
}