import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country: string;
}
