import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrintDocument = Print & Document;

@Schema()
export class Print {
  @Prop({ required: true, unique: true})
  name: string;
  @Prop({ required: true})
  base_rate: Number;
}

export const PrintSchema = SchemaFactory.createForClass(Print);
