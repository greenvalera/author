import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/createUserDto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/addRoleDto";

@Injectable()
export class UsersService {
    constructor(
       @Inject('USERS_REPOSITORY')
       private usersRepository: typeof User,
       private rolesService: RolesService
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.getByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.findAll<User>({include: {all: true}});
    }

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne<User>({where: {email}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto): Promise<User> {
        const user = await this.usersRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException("User is not found", HttpStatus.BAD_REQUEST);
        }
        const role = await this.rolesService.getByValue(dto.role);
        if(!role) {
            throw new HttpException("Role is not found", HttpStatus.BAD_REQUEST);
        }

        await user.$add('roles', role.id)
        return user;
    }
}
