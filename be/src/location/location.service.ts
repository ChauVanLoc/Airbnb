import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { location } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async detail(location_id: number): Promise<ApiResponse<location>> {
    const location = await this.prisma.location.findUnique({
      where: {
        location_id,
      },
    });
    return {
      message: 'Get detail location successfull!',
      data: location,
    };
  }

  async all(): Promise<ApiResponse<location[]>> {
    const locations = await this.prisma.location.findMany();
    return {
      message: 'Get all location successfull!',
      data: locations,
    };
  }

  async update() {}

  async create() {}

  async delete(location_id: number): Promise<ApiResponse<{}>> {
    const location = await this.prisma.location.findUnique({
      where: {
        location_id,
      },
    });
    if (!location) {
      throw new HttpException(
        'Location does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.location.delete({
      where: {
        location_id,
      },
    });
    return {
      message: 'Delete location successfull!',
      data: {},
    };
  }
}
