import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {rolesProviders} from "./roles.providers";

@Module({
  providers: [
    RolesService,
      ...rolesProviders
  ],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
