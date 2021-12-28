import {Inject, Injectable, Scope, UnauthorizedException,} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {JwtService} from "@nestjs/jwt";
import { Request } from 'express';

interface TokenData {
  id: number;
}

class User {
  constructor(readonly id: number) {}
}

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  user() {
    console.log(this.request.headers);
    const authHeader = this.request.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({message: "User is not authorized"});
    }

    const userData = this.jwtService.verify(token);
    return RequestService.getUserFromTokenData(userData);
  }

  private static getUserFromTokenData(tokenData: TokenData): User {
    const {id} = tokenData;
    return new User(id);
  }

}
