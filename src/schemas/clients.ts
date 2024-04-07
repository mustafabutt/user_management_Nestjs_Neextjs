import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop()
  orders_in_progress: [];
  @Prop()
  orders_completed: [];
  @Prop()
  orders_cancelled: [];

}

export const ClientSchema = SchemaFactory.createForClass(Client);
