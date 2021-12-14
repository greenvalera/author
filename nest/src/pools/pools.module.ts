import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import {poolsProviders} from "./pools.providers";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [
    PoolsService,
    ...poolsProviders
  ],
  controllers: [PoolsController],
  imports: [AuthModule],
})
export class PoolsModule {}
