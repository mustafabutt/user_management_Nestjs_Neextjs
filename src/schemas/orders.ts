import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, unique: true})
  id: string;
  @Prop({ required: true})
  delivery_date: string;
  @Prop({ required:true})
  shipping: string;
  @Prop({ default:""})
  status: string;
  @Prop({ required: true})
  customer_email: string;
  @Prop({ required: true})
  details: Array<object>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
