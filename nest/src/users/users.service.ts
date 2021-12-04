import {Inject, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/createUserDto";
import {RolesService} from "../roles/roles.service";

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
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.findAll<User>({include: {all: true}});
    }
}
