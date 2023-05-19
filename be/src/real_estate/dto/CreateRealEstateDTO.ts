import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ConflicPrice } from 'src/utils/ConflicPrice';

export class CreateRealEstateQueryDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  name: string;

  @ApiProperty()
  @IsEnum(
    [
      'rooms',
      'castles',
      'beachfront',
      'iconiccities',
      'desert',
      'omg',
      'adapted',
      'hanoks',
      'amazingpools',
      'lakefront',
      'amazingviews',
    ],
    {
      message: 'Type is invalid!',
    },
  )
  type:
    | 'rooms'
    | 'castles'
    | 'beachfront'
    | 'iconiccities'
    | 'desert'
    | 'omg'
    | 'adapted'
    | 'hanoks'
    | 'amazingpools'
    | 'lakefront'
    | 'amazingviews';

  @ApiProperty()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  location_id: number;

  @ApiProperty()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  room_amount: number;

  @ApiProperty()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  bed_amount: number;

  @ApiProperty()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  bathroom_amount: number;

  @ApiProperty()
  @IsString()
  @MaxLength(2000, { message: 'Lenght of description is 2000 character!' })
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsBoolean()
  washingmachine: boolean;

  @ApiProperty()
  @IsBoolean()
  iron: boolean;

  @ApiProperty()
  @IsBoolean()
  television: boolean;

  @ApiProperty()
  @IsBoolean()
  airconditioner: boolean;

  @ApiProperty()
  @IsBoolean()
  wifi: boolean;

  @ApiProperty()
  @IsBoolean()
  kitchen: boolean;

  @ApiProperty()
  @IsBoolean()
  parkinglot: boolean;

  @ApiProperty()
  @IsBoolean()
  pool: boolean;
}
