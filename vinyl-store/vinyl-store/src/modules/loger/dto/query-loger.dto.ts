import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EntityEnum, OperationEnum } from './create-loger.dto';

export class QueryLogerDto {

  @ApiProperty({ default: 'VINYL', required: false })
  @IsOptional()
  entity?: EntityEnum;

  @ApiProperty({ default: 'POST', required: false })
  @IsOptional()
  operation?: OperationEnum;
}
