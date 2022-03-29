import {Body, Controller, Get, Post, UploadedFile, UseInterceptors, Request} from '@nestjs/common';
import {CreatePostDto} from "./dto/createPostDto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile() image,
    @Request() req
  ) {
    return this.postsService.create({...dto, userId: req.user.userId}, image);
  }

  @Get('/')
  getAll(@Request() req) {
    return this.postsService.getAll(req.user.userId);
  }
}
