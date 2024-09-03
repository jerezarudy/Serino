import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() item: Item) {
    return this.itemsService.create(item);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() item: Item) {
    return this.itemsService.update(id, item);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() item: Item) {
    return this.itemsService.update(id, item);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.itemsService.deleteAll();
  }
}
