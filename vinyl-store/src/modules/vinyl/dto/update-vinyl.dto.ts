import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVinylDto {
  @ApiProperty({ default: 'Default Name', required: false  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 'Default Author', required: false  })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({ default: 'https://example.com/default-photo.jpg', required: false  })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({ default: 'Default Description', required: false  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 0, required: false  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
