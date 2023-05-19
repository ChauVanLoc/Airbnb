import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { RealEstateService } from './real_estate.service';
import { RealEstateQueryDTO } from './dto/RealEstateQueryDTO';
import { Public } from 'src/metadata/public.metadata';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateRealEstateQueryDTO } from './dto/CreateRealEstateDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto } from './dto/FilesUploadDto';

@ApiTags('Real estate')
@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Public()
  @Get()
  getAll(@Query() query: RealEstateQueryDTO) {
    return this.realEstateService.getAll(query);
  }

  @Public()
  @Get(':re_id')
  getDetail(@Param() param: number) {
    return this.realEstateService.getDetail(param);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of real estate',
    type: FilesUploadDto,
  })
  createRealEstate(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000 * 1000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    images: Array<Express.Multer.File>,
    @Body() body: CreateRealEstateQueryDTO,
  ) {
    return this.realEstateService.createRealEstate();
  }
}
