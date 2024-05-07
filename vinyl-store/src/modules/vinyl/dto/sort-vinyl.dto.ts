import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortFieldEnum {
  NAME = 'name',
  AUTHOR_NAME = 'authorName',
  PRICE = 'price',
}

export class SortVinylDto {
  @ApiProperty({ default: 'ASC' })
  @IsNotEmpty()
  orderBy?: OrderByEnum;

  @ApiProperty({ default: 'NAME' })
  @IsNotEmpty()
  sortField: SortFieldEnum = SortFieldEnum.NAME;

}
