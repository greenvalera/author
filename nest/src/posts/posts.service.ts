import {Inject, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/createPostDto";
import {Post} from "./post.entity";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

  constructor(
    @Inject("POSTS_REPOSITORY")
    private postRepository: typeof Post,
    private filesService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any): Promise<Post> {
    const fileName = await this.filesService.createFile(image);
    return await this.postRepository.create({...dto, image: fileName});
  }

  async getAll(authorId: number): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({where: {userId: authorId}});
  }
}
