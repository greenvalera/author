import {Inject, Injectable} from '@nestjs/common';
import {Item} from "./item.entity";
import {CreateItemDto} from "./dto/createItemDto";

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEMS_REPOSITORY')
    readonly itemsRepository: typeof Item
  ) {}

  async getAll() {
    return await this.itemsRepository.findAll();
  }

  async create(dto: CreateItemDto) {
    return await this.itemsRepository.create(dto);
  }
}
