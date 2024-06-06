import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateDerslerDto {


    @IsNotEmpty()
    ad: string
    @IsNotEmpty()
    kredi:number
    @IsNotEmpty()
    akts :number
    @IsNotEmpty()
    donem:number
    @IsNotEmpty()
    bolum:string
    @IsNotEmpty()
    saat:number
    @IsNotEmpty()
    @IsNumber()
    lecturerId:number
}
