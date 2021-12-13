import {Body, Controller, Get, Post} from '@nestjs/common';
import {ItemsService} from "./items.service";
import {CreateItemDto} from "./dto/createItemDto";

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}
  @Get('/')
  getAll() {
    return this.itemService.getAll();
  }

  @Post('/')
  create(@Body() dto: CreateItemDto) {
    return this.itemService.create(dto);
  }
}
