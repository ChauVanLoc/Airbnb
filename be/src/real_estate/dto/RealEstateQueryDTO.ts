import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ConflicPrice } from 'src/utils/ConflicPrice';

export class RealEstateQueryDTO {
  @ApiPropertyOptional()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  name: string;

  @ApiPropertyOptional()
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

  @ApiPropertyOptional()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  location_id: number;

  @ApiPropertyOptional()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  capacity: number;

  @ApiPropertyOptional()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  room_amount: number;

  @ApiPropertyOptional()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  bed_amount: number;

  @ApiPropertyOptional()
  @Transform((value) => {
    if (Number(value) < 0) {
      return 1;
    }
    return value;
  })
  @IsNumber()
  bathroom_amount: number;

  @ApiPropertyOptional()
  @IsNumber()
  price_min: number;

  @ConflicPrice('price_min')
  @ApiPropertyOptional()
  @IsNumber()
  price_max: number;

  @ApiPropertyOptional()
  @IsBoolean()
  washingmachine: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  iron: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  television: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  airconditioner: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  wifi: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  kitchen: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  parkinglot: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  pool: boolean;
}
