import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {itemsProviders} from "./items.providers";

@Module({
  providers: [
    ItemsService,
    ...itemsProviders
  ],
  controllers: [ItemsController]
})
export class ItemsModule {}
