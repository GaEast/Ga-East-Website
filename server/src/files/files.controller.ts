import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL || 'https://<my-app-name>.onrender.com';
const UPLOADS_PATH = '/uploads';

@Controller('files')
export class FilesController {
  @Get()
  getFiles() {
    const filesDir = UPLOADS_PATH;
    let files: string[] = [];
    try {
      files = readdirSync(filesDir);
    } catch (e) {
      return [];
    }
    return files.map((name) => ({
      name,
      url: `${BASE_URL}/uploads/${name}`,
    }));
  }

  @Get('html')
  getFilesHtml(@Res() res: Response) {
    const filesDir = UPLOADS_PATH;
    let files: string[] = [];
    try {
      files = readdirSync(filesDir);
    } catch (e) {
      return res.status(200).send('<h2>No files found.</h2>');
    }
    const links = files
      .map(
        (name) =>
          `<li><a href="${BASE_URL}/uploads/${name}" target="_blank">${name}</a></li>`,
      )
      .join('');
    const html = `<html><body><h2>Files</h2><ul>${links}</ul></body></html>`;
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}
