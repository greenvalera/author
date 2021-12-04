import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/createUserDto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() user: CreateUserDto) {
        return await this.authService.login(user);
    }

    @Post('/registration')
    async registration(@Body() user: CreateUserDto) {
        return await this.authService.registration(user);
    }
}
