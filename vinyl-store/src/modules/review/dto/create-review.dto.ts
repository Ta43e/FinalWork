import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ default: 'hi fff' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({ default: 3 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}