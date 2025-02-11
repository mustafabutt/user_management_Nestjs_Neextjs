import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true , default:"normal"})
  role: string;
  
  @Prop({ required: false })
  createdBy: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
