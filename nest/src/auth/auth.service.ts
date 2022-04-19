import * as bcrypt from 'bcryptjs'
import {HttpException, HttpStatus, Injectable, Scope, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/createUserDto";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {TokensService} from "../tokens/tokens.service";
import {PublicUserData} from "./interfaces/interfaces";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

    constructor(
      private userService: UsersService,
      private tokenService: TokensService,
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto.email, userDto.password);
        return await this.getUserData(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.findByEmail(userDto.email);
        if (candidate) {
            // TODO: create service exception and throw HTTP exception in controller
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({
            ...userDto,
            password: hashPassword
        });

        return await this.getUserData(user);
    }

    async refresh(refreshToken) {
        const token = await this.tokenService.findByRefreshToken(refreshToken);
        if (!token) {
            throw new HttpException('TOKEN_NOT_FOUND', HttpStatus.FORBIDDEN);
        }
        return  this.getUserData(token.user);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        const passwordEquals = await bcrypt.compare(password, user.password);
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: "Incorrect email or password"});
    }
    async getUserData(user: User): Promise<PublicUserData> {
        console.log(user.roles);
        const userDto = this.userService.getUserDto(user);
        const tokens = this.tokenService.generateTokens({...userDto});
        await this.tokenService.saveRefreshToken({userId: userDto.id, refreshToken: tokens.refreshToken});
        return {...tokens, userDto }
    }
}
