import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateVinylDto {
  @ApiProperty({ default: 'Default Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'Default Author' })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({ default: 'https://example.com/default-photo.jpg' })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({ default: 'Default Description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
