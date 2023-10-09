import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, unique: true})
  name: string;

  @Prop({ required: true })
  fabricAverage: Array<object>;

}

export const ItemSchema = SchemaFactory.createForClass(Item);
