import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { real_estate } from '@prisma/client';
import { omit } from 'lodash';
import { Public } from 'src/metadata/public.metadata';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { RealEstateQuery } from 'src/types/RealEstate.type';

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  async all(data: RealEstateQuery) {
    const limit = data.limit || 5;
    const real_estate = await this.prisma.real_estate.findMany({
      where: {
        ...omit(data, ['page', 'limit', 'order_by', 'price_min', 'price_max']),
        price: {
          gte: data.price_min,
          lte: data.price_max,
        },
        name: {
          contains: data.name,
        },
      },
      include: {
        user: true,
        book_room: true,
      },
      skip: data.page >= 1 ? (data.page - 1) * limit : 0,
      take: limit,
      orderBy: {
        price: data.order_by || 'asc',
      },
    });
    return {
      message: 'Get all real estate successfull!',
      data: {
        real_estates: real_estate.map((re) => omit(re, ['user.password'])),
        ...data,
        page: data.page || 1,
        page_size: Math.ceil(real_estate.length / limit),
        limit,
        order_by: data.order_by || 'asc',
      },
    };
  }

  @Public()
  async detail(re_id: number): Promise<ApiResponse<real_estate>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id,
      },
      include: {
        user: true,
        book_room: true,
        _count: true,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail real estate successfull!',
      data: re,
    };
  }

  async create(
    imgs: Express.Multer.File[],
    body: Omit<real_estate, 'images' | 'created' | 'updated' | 're_id'>,
  ): Promise<ApiResponse<real_estate>> {
    const listImgsName = imgs.map((i) => i.filename).join('_');
    const new_re = await this.prisma.real_estate.create({
      data: {
        ...body,
        images: listImgsName,
      },
    });
    return {
      message: 'Create real estate successfull!',
      data: new_re,
    };
  }

  async update(
    imgs: Express.Multer.File[],
    body: Partial<
      Omit<real_estate, 'images' | 'user_id' | 'created' | 'updated'>
    >,
  ): Promise<ApiResponse<real_estate>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id: body.re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const listImgsName = imgs.map((i) => i.filename).join('_');
    const update_re = await this.prisma.real_estate.update({
      where: {
        re_id: body.re_id,
      },
      data: {
        ...body,
        images: listImgsName,
      },
    });
    return {
      message: 'Update real estate successfull!',
      data: update_re,
    };
  }

  async delete(re_id: number): Promise<ApiResponse<{}>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.comment.deleteMany({
      where: {
        re_id,
      },
    });
    await this.prisma.book_room.deleteMany({
      where: {
        re_id,
      },
    });
    await this.prisma.real_estate.delete({
      where: {
        re_id,
      },
    });
    return {
      message: 'Delete real estate successfull!',
      data: {},
    };
  }
}
