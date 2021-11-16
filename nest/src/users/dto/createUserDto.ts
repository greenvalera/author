import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'green@gmail.com', description: 'email адрес почты'})
    readonly email: string;

    @ApiProperty({example: '123qwe', description: 'Пароль'})
    readonly password: string;
}