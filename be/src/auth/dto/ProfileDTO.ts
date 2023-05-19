import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MaxLength,
} from 'class-validator';

export class ProfileDTO {
  @ApiProperty()
  @IsOptional()
  @MaxLength(60, { message: 'Full name is required!' })
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Gender must is male or female or other',
  })
  gender: 'male' | 'female' | 'other';

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthday: Date;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('VE', {
    message: 'Currently, The system only accept phone of VietNam',
  })
  phone: string;
}
