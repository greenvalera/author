import * as bcrypt from 'bcryptjs'
import {ForbiddenException, HttpException, HttpStatus, Injectable, Scope} from '@nestjs/common';
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
        return  await this.getUserData(token.user);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            AuthService.throwForbiddenException();
        }

        const passwordEquals = await bcrypt.compare(password, user.password);
        if (passwordEquals) {
            return user;
        }

        AuthService.throwForbiddenException();
    }
    async getUserData(userModel: User): Promise<PublicUserData> {
        const user = this.userService.getUserDto(userModel);
        const tokens = this.tokenService.generateTokens({...user});
        await this.tokenService.saveRefreshToken({userId: user.id, refreshToken: tokens.refreshToken});
        return {...tokens, user }
    }

    private static throwForbiddenException() {
        throw new ForbiddenException({message: "Incorrect email or password"});
    }
}
