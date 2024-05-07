import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { VinylDocument } from './Vinyl.shema';
import { UserDocument } from './User.schema';

export type ReviewDocument = HydratedDocument<Review>

@Schema()
export class Review {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: UserDocument;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vinyl' })
    vinyl: VinylDocument;

    @Prop({ required: true })
    comment: string;
  
    @Prop({ required: true })
    rating: number;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
