import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { VinylDocument } from './Vinyl.shema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vinyl' }], default: [] })
  vinylList: VinylDocument[];

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true, default: 'USER'})
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);