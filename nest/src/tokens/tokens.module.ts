import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import {tokensProviders} from "./tokens.providers";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h',
        },
      }
    ),
  ],
  providers: [
    TokensService,
    ...tokensProviders
  ],
  exports: [
    TokensService
  ]
})
export class TokensModule {}
