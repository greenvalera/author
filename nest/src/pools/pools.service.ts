import {Inject, Injectable} from '@nestjs/common';
import {Pool} from "./pool.entity";
import {CreatePoolDto} from "./dto/createPoolDto";

@Injectable()
export class PoolsService {

  constructor(
    @Inject('POOLS_REPOSITORY')
    readonly poolsRepository: typeof Pool
  ) {}
  async getAll() {
    return await this.poolsRepository.findAll();
  }

  async create(dto: CreatePoolDto) {
    return await this.poolsRepository.create(dto);
  }
}
