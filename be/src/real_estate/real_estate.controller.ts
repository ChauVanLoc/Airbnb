import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { RealEstateService } from './real_estate.service';
import { RealEstateQueryDTO } from './dto/RealEstateQueryDTO';
import { Public } from 'src/metadata/public.metadata';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateRealEstateDTO } from './dto/CreateRealEstateDTO';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UpdateRealEstateDTO } from './dto/UpdateRealEstateDTO';
import { AuthRequest } from 'src/types/AuthRequest.type';
import { FileUploadDto } from './dto/FileUploadDTO';

@ApiTags('Real Estate')
@ApiBearerAuth()
@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Public()
  @ApiOperation({ summary: 'Get all real estate' })
  @ApiOkResponse({ description: 'Get all real estate successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @ApiQuery({ type: RealEstateQueryDTO })
  @Get()
  all(@Query() query: RealEstateQueryDTO) {
    return this.realEstateService.all(query);
  }

  @ApiOperation({ summary: 'Get detail real estate' })
  @ApiOkResponse({ description: 'Get detail real estate successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiParam({ name: 're_id', required: true })
  @Public()
  @Get(':re_id')
  detail(@Param('re_id') param: number) {
    return this.realEstateService.detail(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create real estate' })
  @ApiCreatedResponse({ description: 'Create real estate successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseInterceptors(FilesInterceptor('image', 5))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateRealEstateDTO,
  })
  create(
    @Body() body: CreateRealEstateDTO,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000 * 1000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Req() req: AuthRequest,
  ) {
    return this.realEstateService.create(files, {
      user_id: req.user.user_id,
      ...body,
    });
  }

  @Put()
  @ApiOperation({ summary: 'Update real estate' })
  @ApiCreatedResponse({ description: 'Update real estate successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseInterceptors(FilesInterceptor('file', 5))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateRealEstateDTO,
  })
  update(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000 * 1000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
    @Body() body: UpdateRealEstateDTO,
  ) {
    return this.realEstateService.update(files, body);
  }

  @Delete(':re_id')
  @ApiOperation({ summary: 'Delete real estate' })
  @ApiCreatedResponse({ description: 'Delete real estate successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiParam({ name: 're_id', required: true })
  delete(@Param('re_id') param: number) {
    return this.realEstateService.delete(param);
  }
}
