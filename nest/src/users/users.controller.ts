import {Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUserDto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.entity";
import {AddRoleDto} from "./dto/addRoleDto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

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

    @ApiOperation({summary: 'Add role to user'})
    @ApiResponse({status: 200, type: User})
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Post('/role')
    async addRole(@Body() addRoleDto: AddRoleDto) {
        return await this.usersService.addRole(addRoleDto);
    }
}
