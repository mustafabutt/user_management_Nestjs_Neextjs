import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmbroideryDocument = Embroidery & Document;

@Schema()
export class Embroidery {
  @Prop({ required: true, unique: true})
  name: string;
  @Prop({ required: true})
  base_rate: Number;
}

export const EmbroiderySchema = SchemaFactory.createForClass(Embroidery);
