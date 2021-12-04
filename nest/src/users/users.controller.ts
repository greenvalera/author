import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUserDto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.entity";

@ApiTags('Пользователи')
@Controller('/users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @ApiOperation({summary: 'Получение списка пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get('/')
    getAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/')
    async create(@Body() userDto: CreateUserDto) {
        try {
            return await this.usersService.create(userDto);
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new HttpException('USER_EXISTS', HttpStatus.BAD_REQUEST);
            }
        }
    }
}
