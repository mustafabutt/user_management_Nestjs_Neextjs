import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShippingDocument = Shipping & Document;

@Schema()
export class Shipping {
  @Prop({ required: true, unique: true})
  service: string;

  @Prop({ required: true })
  rate: Array<object>;

}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
