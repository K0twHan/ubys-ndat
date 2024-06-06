import { IS_LENGTH, IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    tc : string;
    @IsNotEmpty()
    password: string;
}
