import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/createUserDto";
import {AuthService} from "./auth.service";
import {Public} from "./public.decorator";
import {TokensService} from "../tokens/tokens.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService,
      private tokenService: TokensService
    ) {}

    @Post('/login')
    @Public()
    async login(
      @Body() user: CreateUserDto,
      @Res({ passthrough: true }) response: Response
    ) {
        const userData = await this.authService.login(user);
        AuthController.setCookie(response, userData.refreshToken);
        return userData;
    }

    @Public()
    @Post('/registration')
    async registration(
      @Body() user: CreateUserDto,
      @Res({ passthrough: true }) response: Response
    ) {
        const userData = await this.authService.registration(user);
        AuthController.setCookie(response, userData.refreshToken);
        return userData;
    }

    @Post('/logout')
    async logout(
      @Req() request: Request,
      @Res({ passthrough: true }) response: Response
    ) {
        const { refreshToken } = request.cookies;
        const token = await this.tokenService.remove(refreshToken);
        response.clearCookie('refreshToken');
        return token;
    }

    @Public()
    @Post('/refresh')
    async refresh(
      @Req() request: Request,
      @Res({ passthrough: true }) response: Response
    ) {
        const { refreshToken } = request.cookies;
        const userData = await this.authService.refresh(refreshToken);
        AuthController.setCookie(response, userData.refreshToken);
        return userData;
    }

    private static setCookie(response: Response, refreshToken: string): void {
        response.cookie(
          'refreshToken',
          refreshToken,
          {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        );
    }
}
