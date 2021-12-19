import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, maxlength: 50, minlength: 5})
  username: string;

  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop({ required: true })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
