import {Inject, Injectable} from '@nestjs/common';
import {Role} from "./role.entity";
import {CreateRoleDto} from "./dto/createRoleDto";

@Injectable()
export class RolesService {
  constructor(
    @Inject("ROLES_REPOSITORY")
    private rolesRepository: typeof Role
  ) {}

  async create(dto: CreateRoleDto) {
    return await this.rolesRepository.create(dto);
  }

  async getByValue(value: string) {
    return await this.rolesRepository.findOne({where: {value}})
  }
}
