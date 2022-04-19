import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User as UserModel} from "./user.entity";
import {CreateUserDto} from "./dto/createUserDto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/addRoleDto";
import {User as UserDto} from "./dto/user";
import {Role} from "../roles/role.entity";

@Injectable()
export class UsersService {
    constructor(
       @Inject('USERS_REPOSITORY')
       private usersRepository: typeof UserModel,
       private rolesService: RolesService
    ) {}

    async create(dto: CreateUserDto): Promise<UserModel> {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.getByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async findAll(): Promise<UserModel[]> {
        return await this.usersRepository.findAll<UserModel>({include: {all: true}});
    }

    async findByEmail(email: string): Promise<UserModel> {
        return await this.usersRepository.findOne<UserModel>({where: {email}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto): Promise<UserModel> {
        const user = await this.usersRepository.findByPk<UserModel>(dto.userId);
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

    public getUserDto(model: UserModel): UserDto {
        const {id, email} = model;
        const roles = model.roles.map((role: Role): string => role.value);
        return new UserDto(
          {id, email, roles}
        );
    }
}
