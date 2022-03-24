import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {postsProviders} from "./posts.providers";
import {RequestModule} from "../request/request.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [
    ...postsProviders,
    PostsService
  ],
  controllers: [PostsController],
  imports: [
    RequestModule,
    FilesModule
  ],
})
export class PostsModule {}
