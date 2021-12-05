import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {usersProviders} from "./users.providers";
import {DatabaseModule} from "../database/database.module";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    DatabaseModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
      UsersService,
      ...usersProviders
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
