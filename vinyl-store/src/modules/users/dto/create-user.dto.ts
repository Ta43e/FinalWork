import { IsEmail, IsNotEmpty, IsString, IsDateString, ArrayMinSize } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @ArrayMinSize(0)
  vinylList: string[]; 

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}