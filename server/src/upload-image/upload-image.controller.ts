import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

const BASE_URL = process.env.BASE_URL || 'https://<my-app-name>.onrender.com';

@Controller('upload')
export class UploadImageController {
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadImage(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded.');
    }
    console.log('File uploaded successfully');
    console.log(file);

    const filename = file.filename;
    const url = `${BASE_URL}/uploads/${filename}`;

    return {
      message: 'File uploaded successfully',
      filename,
      url,
    };
  }
}
