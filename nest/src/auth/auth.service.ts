import * as bcrypt from 'bcryptjs'
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/createUserDto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {

    constructor(
      private userService: UsersService,
      private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
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

        return this.generateToken(user);
    }

    private generateToken({id, email, roles}: User) {
        const payload = {id, email, roles};
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user = await this.userService.findByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: "Incorrect email or password"});
    }
}
