import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema} from 'mongoose';
import { Client } from './clients';
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
  details: Array<object>;
  @Prop({ type: Types.ObjectId,ref: 'Client' })
  client: Client
}

export const OrderSchema = SchemaFactory.createForClass(Order);
