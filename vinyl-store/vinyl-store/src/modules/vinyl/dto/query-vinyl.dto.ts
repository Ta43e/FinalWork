import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class QueryVinylDto {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @Min(0)
  offset: number = 0;

  @ApiProperty({ default: 2 })
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  limit: number = 100;
}
