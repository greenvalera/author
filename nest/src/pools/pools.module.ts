import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import {poolsProviders} from "./pools.providers";
import {RequestModule} from "../request/request.module";

@Module({
  providers: [
    PoolsService,
    ...poolsProviders
  ],
  controllers: [PoolsController],
  imports: [RequestModule],
})
export class PoolsModule {}
