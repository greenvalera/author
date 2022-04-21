import {Inject, Injectable} from '@nestjs/common';
import {CreateTokenDto} from "./dto/createTokenDto";
import {Token} from "./token.entity";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/user.entity";
import {Tokens} from "./interfaces/tokens";
import {Role} from "../roles/role.entity";

@Injectable()
export class TokensService {
  constructor(
    @Inject("TOKENS_PROVIDER")
    private tokenRepository: typeof Token,
    private jwtService: JwtService
  ) {}

  async saveRefreshToken(dto: CreateTokenDto): Promise<Token> {
    const {userId, refreshToken} = dto;
    const tokenData = await this.tokenRepository.findOne({where: {userId}});
    if(tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    return await this.tokenRepository.create(dto);
  }

  async findByUser(userId: number): Promise<Token> {
    return await this.tokenRepository.findOne<Token>({where: {userId}})
  }

  async findByRefreshToken(refreshToken: string): Promise<Token> {
    return await this.tokenRepository.findOne<Token>(
      {
        where: {refreshToken},
        include: [{
          model: User,
          include: [{
            model: Role,
          }],
        }]
      }
    );
  }

  async remove(refreshToken: string) {
    return await this.tokenRepository.destroy({where: {refreshToken}})
  }

  generateTokens(payload): Tokens {
    const accessToken = this.jwtService.sign(payload, {secret: process.env.JWT_ACCESS_SECRET, expiresIn: '30m'});
    const refreshToken =  this.jwtService.sign(payload, {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '15d'});

    return {
      accessToken,
      refreshToken
    }
  }
}
