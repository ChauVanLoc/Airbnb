import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/CreateCommentDTO';
import { UpdateCommentDTO } from './dto/UpdateCommentDTO';
import { QueryCommentDTO } from './dto/QueryCommentDTO';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  all(@Query() query: QueryCommentDTO) {
    return this.commentService.all(query);
  }

  @ApiBearerAuth()
  @Get(':comment_id')
  detail(@Param('comment_id') param: number) {
    return this.commentService.detail(param);
  }

  @ApiBearerAuth()
  @Post()
  create(@Body() body: CreateCommentDTO) {
    return this.commentService.create(body);
  }

  @ApiBearerAuth()
  @Put()
  update(@Body() body: UpdateCommentDTO) {
    return this.commentService.update(body);
  }

  @ApiBearerAuth()
  @Delete(':comment_id')
  delete(@Param('comment_id') param: number) {
    return this.commentService.delete(param);
  }
}
