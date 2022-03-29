import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {postsProviders} from "./posts.providers";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [
    ...postsProviders,
    PostsService
  ],
  controllers: [PostsController],
  imports: [
    FilesModule
  ],
})
export class PostsModule {}
