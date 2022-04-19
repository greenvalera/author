import {forwardRef, Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {TokensModule} from "../tokens/tokens.module";

@Module({
  providers: [
    LocalStrategy,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    TokensModule,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
