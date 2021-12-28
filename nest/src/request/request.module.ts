import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [RequestService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      }
    }),
  ],
  exports: [
    JwtModule,
    RequestService,
  ]
})
export class RequestModule {}
