import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from 'src/schemas/Review.shema';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModule } from './review.model';
import { QueryReviewDto } from './dto/query-review.dto';
import { LogerService } from '../loger/loger.service';
import { CreateLogerDto, EntityEnum, OperationEnum } from '../loger/dto/create-loger.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
  private LogerService: LogerService) {}

  public async addReview(idUser: Types.ObjectId, idVinyl: Types.ObjectId, createReviewDto: CreateReviewDto): Promise<ReviewModule> {
    const review: ReviewDocument = await this.reviewModel.findOne({user: idUser, vinyl: idVinyl})
    if (!review) {
      const reviewNew = {
        user: idUser,
        vinyl: idVinyl,
        comment: createReviewDto.comment,
        rating: createReviewDto.rating,
      }
      const log: CreateLogerDto = {
        entity: EntityEnum.REVIEW,
        operation: OperationEnum.POST,
        data: `${idUser} added  review to ${idVinyl}`
    };
    await this.LogerService.log(log);
      return await this.reviewModel.create(reviewNew);
    } else {
      return review;
    }
  }

  public async removeReview(idRewiew: Types.ObjectId): Promise<ReviewModule> {
    const review: ReviewDocument = await this.reviewModel.findOneAndDelete(idRewiew);
    const log: CreateLogerDto = {
      entity: EntityEnum.REVIEW,
      operation: OperationEnum.DELETE,
      data: `${review.user} added deleted to ${review.vinyl}`
  };
  await this.LogerService.log(log);
    return review;
  }

  public async getReview(idVinyl: Types.ObjectId, queryReviewDto: QueryReviewDto): Promise<ReviewModule[]> {
    const { offset, limit } = queryReviewDto;
    const review: ReviewDocument[]  = await this.reviewModel.find({vinyl: idVinyl}).skip(offset).limit(limit).exec();
    if (review) {
      return  review;
    } else {
      return null; 
    }
  }
}