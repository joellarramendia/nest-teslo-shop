import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Get('product/:imageName')
  @ApiOperation({ summary: 'Get a product image by filename' })
  @ApiParam({
    name: 'imageName',
    description: 'Product image filename (e.g. 1733321-00-A_0_2000.jpg)',
    example: '1733321-00-A_0_2000.jpg'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the static image file stream',
    schema: {
      type: 'string',
      format: 'binary'
    }
  })
  @ApiResponse({ status: 400, description: 'Image not found' })
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage(imageName)

    res.sendFile(path)
  }

  @Post('product')
  @ApiOperation({ summary: 'Upload a product image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload (png, jpg, jpeg, gif)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file binary'
        }
      },
      required: ['file']
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        secureUrl: {
          type: 'string',
          example: 'http://localhost:3000/api/files/product/1733321-00-A_0_2000.jpg',
          description: 'Full public URL to retrieve the image'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request (file missing or invalid extension)' })
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: {fileSize: 1000}
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File
  ) {

    if (!file) throw new BadRequestException('Make sure that the file is an image')

    // const secureUrl = `${file.filename}`
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`

    return { secureUrl }
  }
}
