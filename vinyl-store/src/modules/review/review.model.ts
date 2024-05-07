import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/Review.shema';
import { AuthModule } from '../auth/auth.module';
import { LogerModule } from '../loger/loger.model';

@Module({
  imports: [
    JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '3d' },
  }), 
  MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  AuthModule, LogerModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
}) 
export class ReviewModule {} 