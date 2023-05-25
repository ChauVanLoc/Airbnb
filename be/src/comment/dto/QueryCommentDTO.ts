import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsOptional, IsPositive } from 'class-validator';

export class QueryCommentDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  created: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  updated: Date;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsPositive()
  page: number;

  @ApiPropertyOptional({ default: 5 })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiPropertyOptional({ default: 'asc' })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  order_by: 'asc' | 'desc';
}
