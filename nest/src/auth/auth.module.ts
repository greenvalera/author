import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {RequestModule} from "../request/request.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    RequestModule,
  ],
  exports: [
    AuthService,
    RequestModule
  ]
})
export class AuthModule {}
