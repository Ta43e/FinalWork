import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDateString, ArrayMinSize } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ default: 'New firstName', required: false  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'New lastName', required: false  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ default: "2000-02-24T21:00:00.000Z", required: false  })
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({ default: "https://lh3.googleusercontent.com/a/ACg8ocLUsjy-GonekfQXT2zpZc67tLAMwaZNuy7_myVfuCFkN7i9vQ=s96-c", required: false  })
  @IsNotEmpty()
  @IsString()
  photo: string;
}