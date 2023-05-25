import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ConflicPrice } from 'src/decorators/ConflicPrice';
import { PositiveNumberString } from 'src/decorators/PositiveNumberString';

export class UpdateRealEstateDTO {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Maximum 5 images/*',
  })
  @IsOptional()
  files: any[];

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  re_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Max lenght is 200!' })
  name: string;

  @ApiPropertyOptional({
    isArray: true,
    enum: [
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
  })
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
  @IsOptional()
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
  @IsOptional()
  @IsPositive()
  // @PositiveNumberString()
  @Transform(({ value }) => Number(value))
  location_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  capacity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  room_amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  bed_amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  bathroom_amount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(2000, { message: 'Lenght of description is 2000 character!' })
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  washingmachine: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  iron: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  television: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  airconditioner: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  wifi: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  kitchen: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  parkinglot: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  pool: boolean;
}
