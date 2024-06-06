import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    tc: string;
    @IsNotEmpty()
    password: string;
   
}