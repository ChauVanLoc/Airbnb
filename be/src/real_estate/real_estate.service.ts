import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { real_estate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { RealEstateQuery } from 'src/types/RealEstate.type';

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(data: RealEstateQuery): Promise<ApiResponse<real_estate[]>> {
    const real_estate = await this.prisma.real_estate.findMany({
      where: {
        name: {
          contains: data.name,
        },
        type: {
          equals: data.type,
        },
        location_id: {
          equals: data.location_id,
        },
        capacity: {
          gte: data.capacity,
        },
        room_amount: {
          gte: data.room_amount,
        },
        price: {
          lte: data.price_min,
          gte: data.price_max,
        },
        airconditioner: {
          equals: data.airconditioner,
        },
        wifi: {
          equals: data.wifi,
        },
        bathroom_amount: {
          gte: data.bathroom_amount,
        },
        bed_amount: {
          gte: data.bed_amount,
        },
        iron: {
          equals: data.iron,
        },
        parkinglot: {
          equals: data.parkinglot,
        },
        pool: {
          equals: data.pool,
        },
        television: {
          equals: data.television,
        },
        kitchen: {
          equals: data.kitchen,
        },
        washingmachine: {
          equals: data.washingmachine,
        },
      },
    });
    return {
      message: 'Get all real estate successfull!',
      data: real_estate,
    };
  }

  async getDetail(
    re_id: number,
  ): Promise<ApiResponse<real_estate & { hire_amount: number }>> {
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
    const hire_amount = await this.prisma.book_room.findMany({
      where: {
        re_id: re.re_id,
      },
    });
    return {
      message: 'Get detail real estate successfull!',
      data: {
        ...re,
        hire_amount: hire_amount.length,
      },
    };
  }

  async create() {
    // const
  }

  async delete() {}
}
