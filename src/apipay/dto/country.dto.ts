import { Entity } from "typeorm";
import { CompanyDto } from "./company.dto";
import { IsString } from "class-validator";
import { IsOptional } from "class-validator";


export class CountryDto {
    
    @IsString()
    id:string;

    @IsString()
    code:string;

    @IsString()
    name:string;

    @IsOptional()
    companies:CompanyDto[];
    
}