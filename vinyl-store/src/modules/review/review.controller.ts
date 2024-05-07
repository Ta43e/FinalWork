import {Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { Types } from 'mongoose';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  

  @ApiTags('Review')
  @Roles(['admin'])
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get('/:id')
  async getReview(@Res() res, @Param('id') idVinyl: string, @Query() queryReviewDto: QueryReviewDto) {
    const review =  await this.reviewService.getReview(new Types.ObjectId(idVinyl), queryReviewDto);
    return res.status(200).json(review);
  } 

  @ApiTags('Review')
  @Roles(['admin', 'user'])
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post('add/:id')
  async addReview(@Req() Req,  @Res() res, @Param('id') idVinyl: string, @Body() createReviewDto: CreateReviewDto) {
    const review =  await this.reviewService.addReview( Req['_id'], new Types.ObjectId(idVinyl), createReviewDto);
    return res.status(200).json(review);
  } 

  @ApiTags('Review')
  @Roles(['admin'])
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Delete('delete/:id')
  async removeReview(@Res() res, @Param('id') idVinyl: string) {
    const review =  await this.reviewService.removeReview(new Types.ObjectId(idVinyl));
    return res.status(200).json(review);
  } 


} 

