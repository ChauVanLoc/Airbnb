import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { book_room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class BookRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async all() {}

  async detail(br_id: number): Promise<ApiResponse<book_room>> {
    const br = await this.prisma.book_room.findUnique({
      where: {
        br_id,
      },
      include: {
        real_estate: true,
        user: true,
      },
    });
    if (!br) {
      throw new HttpException(
        'Detail book room does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail book room successfull!',
      data: br,
    };
  }

  async create() {}

  async update() {}

  async delete(br_id: number) {}
}
