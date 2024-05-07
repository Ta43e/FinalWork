import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from 'src/schemas/Review.shema';
import { User } from 'src/schemas/User.schema';
import { Vinyl, VinylDocument } from 'src/schemas/Vinyl.shema';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { QueryVinylDto } from './dto/query-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { SearchVinylDto } from './dto/search-vinyl.dto';
import { OrderByEnum, SortVinylDto } from './dto/sort-vinyl.dto';
import { LogerService } from '../loger/loger.service';
import { CreateLogerDto, EntityEnum, OperationEnum } from '../loger/dto/create-loger.dto';
import { InformationVinyl } from './vinyl.interface';

@Injectable()
export class VinylService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Vinyl.name) private vinylModel: Model<Vinyl>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    private LogerService: LogerService) {}

    public async showAllVinyl(query: QueryVinylDto): Promise<InformationVinyl[]> {
    const { offset, limit } = query;
    const vinyls = await this.vinylModel.find().skip(offset).limit(limit).exec();
    return this.showMoreInformationAboutVinyl(vinyls);
    }

    private async showMoreInformationAboutVinyl(vinyls: VinylDocument[]): Promise<InformationVinyl[]> {
      const vinylsWithDetails: InformationVinyl[] = await Promise.all(
        vinyls.map(async (vinyl) => {
          const reviews: ReviewDocument[] = await this.reviewModel.find({ vinyl: vinyl._id }).exec();
          const averageRating: number = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
          const firstReview: ReviewDocument | null = reviews.length > 0 ? reviews[0] : null;
          if (firstReview) {
            const vinylData: InformationVinyl =
            {
               _id: vinyl._id,
               name: vinyl.name,
               authorName: vinyl.authorName,
               description: vinyl.description,
               price: vinyl.price,
               firstReview: firstReview.comment, 
               averageRating,
           };
           return vinylData; 
          } else {
            const vinylData: InformationVinyl =
            {
               _id: vinyl._id,
               name: vinyl.name,
               authorName: vinyl.authorName,
               description: vinyl.description,
               price: vinyl.price,
               averageRating,
           };
           return vinylData; 
          }
      }))
      return vinylsWithDetails;
  }

    public async createVinyl(createVinylDto: CreateVinylDto): Promise<VinylDocument> {
      const log: CreateLogerDto = {
        entity: EntityEnum.VINYL,
        operation: OperationEnum.POST,
        data:  `${createVinylDto.name}  ` +
        `${createVinylDto.authorName}  ` +
        `${createVinylDto.photo} ` +
        `${createVinylDto.description} ` +
        `${createVinylDto.price} `
    };
    await this.LogerService.log(log);
       return await this.vinylModel.create(createVinylDto);
    }

    public async updateVinyl(_id: Types.ObjectId, vinylDto: UpdateVinylDto): Promise<VinylDocument> {
      let vinyl: VinylDocument = await this.vinylModel.findById(_id);
      console.log(_id);
      console.log(vinyl);
      const beforVinyl = vinyl;
      if (vinyl) {
        vinyl = Object.assign(vinyl, vinylDto);
          await vinyl.save();
          const log: CreateLogerDto = {
            entity: EntityEnum.VINYL,
            operation: OperationEnum.PUT,
            data:  `${beforVinyl.name}       ==> ${vinyl.name}          ` +
                   `${beforVinyl.authorName} ==> ${vinyl.authorName}    ` +
                   `${beforVinyl.photo}      ==>  ${vinyl.photo}        ` +
                   `${beforVinyl.description}==>  ${vinyl.description}  ` +
                   `${beforVinyl.price}      ==>  ${vinyl.price}        `
        };
        await this.LogerService.log(log);
          return vinyl;
      } else {
          throw new UnauthorizedException();
      }
  }

  public async deleteVinyl(_id: Types.ObjectId): Promise<VinylDocument> {
      const vinyl: VinylDocument = await this.vinylModel.findById(_id);
      if (vinyl) {
        const users = await this.userModel.find({ vinylList: _id });

        await Promise.all(users.map(async (user) => {
          user.vinylList = user.vinylList.filter((v) => v._id !== _id);
          await user.save();
        }));
        await vinyl.save();
        const log: CreateLogerDto = {
          entity: EntityEnum.VINYL,
          operation: OperationEnum.DELETE,
          data: `${vinyl.name} deleted`
      };
      await this.LogerService.log(log);
        return await this.vinylModel.findByIdAndDelete(_id);
      } else {
          throw new UnauthorizedException();
      }
  }

    async searchVinyl(searchVinylDto: SearchVinylDto): Promise<InformationVinyl[]> {
      const { name, authorName } = searchVinylDto;
      const query: Record<string, any> = {};
      if (name) {
        query['name'] = { $regex: new RegExp(name, 'i') };
      }
      if (authorName) {
        query['authorName'] = { $regex: new RegExp(authorName, 'i') };
      }
      const searchVinyl: VinylDocument[] = await this.vinylModel.find(query).exec();
      return await this.showMoreInformationAboutVinyl(searchVinyl);
    }

    async sortVinyl(sortVinylDto: SortVinylDto): Promise<InformationVinyl[]> {
      const { sortField , orderBy } = sortVinylDto;

      const sortOptions = {};
      if (sortField && orderBy) {
        sortOptions[sortField] = orderBy === OrderByEnum.ASC ? 1 : -1;
      }
    
      let query = this.vinylModel.find();
      const sortedVinyls: VinylDocument[] = await query.sort(sortOptions).exec();
      return await this.showMoreInformationAboutVinyl(sortedVinyls);
    }
}
