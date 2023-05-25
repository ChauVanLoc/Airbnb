import { Controller, Get, Put, Post, Delete, Param } from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Book Room')
@Controller('book-room')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  @ApiOperation({ summary: 'Get all book rooms' })
  @ApiOkResponse({ description: 'Get all book rooms successfull' })
  @ApiBadRequestResponse({ description: 'Book rooms does not exist' })
  @Get()
  all() {}

  @ApiOperation({ summary: 'Get book room detail' })
  @ApiOkResponse({ description: 'Get book room detail successfull' })
  @ApiBadRequestResponse({ description: 'Book room does not exist' })
  @Get(':br_id')
  detail(@Param('br_id') param: number) {
    return this.bookRoomService.detail(param);
  }

  @ApiOperation({ summary: 'Create book room' })
  @ApiCreatedResponse({ description: 'Create book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @Post()
  create() {}

  @ApiOperation({ summary: 'Update book room' })
  @ApiCreatedResponse({ description: 'Update book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @Put()
  update() {}

  @ApiOperation({ summary: 'Delete book room' })
  @ApiCreatedResponse({ description: 'Delete book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @Delete(':br_id')
  delete(@Param('br_id') param: number) {
    return this.bookRoomService.delete(param);
  }
}
