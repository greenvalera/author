import {Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/createPostDto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {RequestService} from "../request/request.service";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
  constructor(
    private requestService: RequestService,
    private postsService: PostsService
  ) {}

  @Post('/')
  @Roles("USER")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile() image
  ) {
    const userId = this.requestService.user().id;
    return this.postsService.create({...dto, userId}, image);
  }

  @Get('/')
  @Roles("USER")
  @UseGuards(RolesGuard)
  getAll() {
    const userId = this.requestService.user().id;
    return this.postsService.getAll(userId);
  }
}
