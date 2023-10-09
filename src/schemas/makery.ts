import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MakeryDocument = Makery & Document;

@Schema()
export class Makery {
  @Prop({ required: true, unique: true})
  item: string;

  @Prop({ required: true })
  rate: Number;

}

export const MakerySchema = SchemaFactory.createForClass(Makery);
