import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FabricDocument = Fabric & Document;

@Schema()
export class Fabric {
  @Prop({ required: true, unique: true})
  material: string;

  @Prop({ required: true })
  rate: Number;

}

export const FabricSchema = SchemaFactory.createForClass(Fabric);
