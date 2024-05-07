/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { Review } from 'src/schemas/Review.shema';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModule } from './review.model';
import { QueryReviewDto } from './dto/query-review.dto';
import { LogerService } from '../loger/loger.service';
export declare class ReviewService {
    private reviewModel;
    private LogerService;
    constructor(reviewModel: Model<Review>, LogerService: LogerService);
    addReview(idUser: Types.ObjectId, idVinyl: Types.ObjectId, createReviewDto: CreateReviewDto): Promise<ReviewModule>;
    removeReview(idRewiew: Types.ObjectId): Promise<ReviewModule>;
    getReview(idVinyl: Types.ObjectId, queryReviewDto: QueryReviewDto): Promise<ReviewModule[]>;
}
