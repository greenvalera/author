import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'green@gmail.com', description: 'email адрес почты'})
    @IsEmail({}, {message: 'Must be correct email string'})
    readonly email: string;

    @IsString({message: "Must be a string"})
    @Length(3, 16, {message: "Must be a string from 3 to 16 characters"})
    @ApiProperty({example: '123qwe', description: 'Пароль'})
    readonly password: string;
}