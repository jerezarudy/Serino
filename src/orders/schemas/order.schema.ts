import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from '../../items/schemas/item.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  // @Prop({ type: [{ type: Types.ObjectId, ref: Item.name }] })
  // items: Types.ObjectId[];
  @Prop()
  items: [];

  @Prop({ required: true })
  total: number;

  @Prop()
  createdDateTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
