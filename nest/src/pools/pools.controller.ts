import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreatePoolDto} from "./dto/createPoolDto";
import {PoolsService} from "./pools.service";

@Controller('pools')
export class PoolsController {
  constructor(
    private poolsService: PoolsService,
  ) {}

  @Get('/')
  async getAll() {
    return await this.poolsService.getAll();
  }

  @Post('/')
  async create(@Body() dto: CreatePoolDto) {
    return await this.poolsService.create(dto);
  }
}
