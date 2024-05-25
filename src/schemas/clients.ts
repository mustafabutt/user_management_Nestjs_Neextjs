import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Order } from './orders'
export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true, unique: true})
  email: string;
  @Prop({ required: true})
  name: string;
  @Prop({ required: true})
  contact_no: Number;
  @Prop({ required: true})
  country: string;
  @Prop({ required: true})
  city: string;
  @Prop()
  state: string;
  @Prop({ required: true})
  adress: string;
  @Prop({ type: [Types.ObjectId],ref: 'Order' })
  orders: Order[]
  @Prop()
  orders_completed: [];
  @Prop()
  orders_cancelled: [];
  @Prop()
  orders_in_progress : []

}

export const ClientSchema = SchemaFactory.createForClass(Client);
