import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchVinylDto {
  @ApiProperty({ default: 'Default Name', required: false })
  @IsNotEmpty()
  name?: string;


  @ApiProperty({ default: 'Default Author', required: false })
  @IsNotEmpty()
  authorName?: string;
}
