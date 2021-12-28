import {Inject, Injectable} from '@nestjs/common';
import {Pool} from "./pool.entity";
import {CreatePoolDto} from "./dto/createPoolDto";
import {RequestService} from "../request/request.service";

@Injectable()
export class PoolsService {

  constructor(
    @Inject('POOLS_REPOSITORY')
    private readonly poolsRepository: typeof Pool,
    private readonly requestService: RequestService,
  ) {}
  async getAll() {
    return await this.poolsRepository.findAll();
  }

  async create(dto: CreatePoolDto) {
    const user = this.requestService.user();
    dto.userId = user.id;
    return await this.poolsRepository.create(dto);
  }
}
