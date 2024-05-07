import { ReviewDocument } from 'src/schemas/Review.shema';
import { Vinyl } from 'src/schemas/Vinyl.shema';
export declare class ProfileUserDto {
    email: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    photo: string;
    vinylList: Vinyl[];
    reviews: ReviewDocument[];
}
