import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VinylDocument = HydratedDocument<Vinyl>

@Schema()
export class Vinyl {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

export const VinylSchema = SchemaFactory.createForClass(Vinyl);
