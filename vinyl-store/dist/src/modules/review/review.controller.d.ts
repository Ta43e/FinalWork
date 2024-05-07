import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReview(res: any, idVinyl: string, queryReviewDto: QueryReviewDto): Promise<any>;
    addReview(Req: any, res: any, idVinyl: string, createReviewDto: CreateReviewDto): Promise<any>;
    removeReview(res: any, idVinyl: string): Promise<any>;
}
