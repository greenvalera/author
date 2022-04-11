import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { TokensModule } from './tokens/tokens.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
      }),
      UsersModule,
      AuthModule,
      RolesModule,
      PostsModule,
      FilesModule,
      TokensModule
  ],
})
export class AppModule {}
