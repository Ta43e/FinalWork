import { IsEmail, IsNotEmpty, IsString, IsDateString, ArrayMinSize } from 'class-validator';
import { ReviewDocument } from 'src/schemas/Review.shema';
import { Vinyl } from 'src/schemas/Vinyl.shema';

export class ProfileUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @ArrayMinSize(0)
  vinylList: Vinyl[]; 

  @IsNotEmpty()
  @IsString()
  reviews: ReviewDocument[];

}