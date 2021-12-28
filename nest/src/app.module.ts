import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ItemsModule } from './items/items.module';
import { PoolsModule } from './pools/pools.module';
import { RequestModule } from './request/request.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      UsersModule,
      AuthModule,
      RolesModule,
      ItemsModule,
      PoolsModule,
      RequestModule
  ],
})
export class AppModule {}
