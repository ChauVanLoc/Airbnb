import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { comment } from '@prisma/client';
import { Public } from 'src/metadata/public.metadata';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';

@ApiTags('Comment')
@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  async all(
    query: Partial<
      Pick<comment, 'created' | 'updated'> & {
        page: number;
        order_by: 'asc' | 'desc';
        limit: number;
      }
    >,
  ): Promise<ApiResponse<comment[]>> {
    const cmts = await this.prisma.comment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        created: query.order_by || 'asc',
      },
      take: query.limit || 5,
      where: {
        created: query.created,
        updated: query.updated,
      },
    });
    return {
      message: 'Get all comment successful!',
      data: cmts,
    };
  }

  @Public()
  async detail(cmt_id: number): Promise<ApiResponse<comment>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id,
      },
      include: {
        user: true,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail comment successfull',
      data: cmt,
    };
  }

  @ApiBearerAuth()
  async create(
    data: Omit<comment, 'cmt_id' | 'created' | 'updated'>,
  ): Promise<ApiResponse<comment>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id: data.re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: data.user_id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    const new_cmt = await this.prisma.comment.create({
      data,
    });
    return {
      message: 'Create comment successfull!',
      data: new_cmt,
    };
  }

  @ApiBearerAuth()
  async update(
    data: Partial<Omit<comment, 'created' | 'updated'>>,
  ): Promise<ApiResponse<comment>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id: data.cmt_id,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const update_cmt = await this.prisma.comment.update({
      where: {
        cmt_id: data.cmt_id,
      },
      data,
      include: {
        user: true,
      },
    });
    return {
      message: 'Update comment successfull!',
      data: update_cmt,
    };
  }

  @ApiBearerAuth()
  async delete(cmt_id: number): Promise<ApiResponse<{}>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.comment.delete({
      where: {
        cmt_id,
      },
    });
    return {
      message: 'Delete comment successful!',
      data: {},
    };
  }
}
