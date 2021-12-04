import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/createRoleDto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Role} from "./role.entity";

@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) {}

  @ApiOperation({summary: 'Create new role'})
  @ApiResponse({status: 200, type: Role})
  @Post('/')
  create(@Body() role: CreateRoleDto) {
    return this.rolesService.create(role);
  }

  @ApiOperation({summary: 'Getting user role by value'})
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getByValue(value)
  }
}
