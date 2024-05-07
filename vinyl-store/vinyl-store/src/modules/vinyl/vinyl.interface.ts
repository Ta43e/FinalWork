import { Types } from 'mongoose';

export interface InformationVinyl {
    _id: Types.ObjectId;
    name: string;
    authorName: string;
    description: string;
    price: number;
    firstReview?: string; 
    averageRating: number; 
}