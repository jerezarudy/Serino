import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Item, ItemDocument } from '../items/schemas/item.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  async create(orderDto: any): Promise<Order> {
    let itemIds = [];
    orderDto.items?.forEach((element) => {
      itemIds.push(element._id);
    });
    const items = await this.itemModel
      .find({
        _id: { $in: itemIds },
      })
      .exec();

    const total = orderDto.items.reduce(
      (sum: any, item: any) => sum + item.totalPrice,
      0,
    );

    const newOrder = new this.orderModel({
      items: orderDto.items,
      total,
      createdDateTime: new Date(),
    });

    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    const data = await this.orderModel
      .find()
      .populate('items', '_id name')
      .exec();

    return data;
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('items').exec();
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await this.orderModel.deleteMany({});
    return { deletedCount: result.deletedCount };
  }
}
