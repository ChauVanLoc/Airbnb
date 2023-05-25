import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLocationDTO } from './dto/CreateLocationDTO';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  all() {
    return this.locationService.all();
  }

  @Get(':location_id')
  detail(@Param('location_id') param: number) {
    return this.locationService.detail(param);
  }

  @Post()
  create(@Body() body: CreateLocationDTO) {
    return this.locationService.create();
  }

  @Post()
  update() {
    return this.locationService.update();
  }

  @Delete(':location_id')
  delete(@Param('location_id') param: number) {
    return this.locationService.delete(param);
  }
}
