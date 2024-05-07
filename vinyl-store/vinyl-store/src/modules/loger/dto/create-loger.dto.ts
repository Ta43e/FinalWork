import { IsNotEmpty } from 'class-validator';

export enum OperationEnum {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EntityEnum {
    USER = 'USER',
    VINYL = 'VINYL',
    REVIEW = 'REVIEW',
  }

export class CreateLogerDto {
  @IsNotEmpty()
  entity: EntityEnum;

  @IsNotEmpty()
  operation: OperationEnum;

  @IsNotEmpty()
  data: string;
}
