import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readdirSync, createReadStream } from 'fs';
import * as archiver from 'archiver';

const BASE_URL = process.env.BASE_URL || 'https://ga-east-website.onrender.com';
const UPLOADS_PATH = '/uploads';

@Controller('files')
export class FilesController {
  @Get()
  getFiles() {
    let files: string[] = [];
    try {
      files = readdirSync(UPLOADS_PATH);
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
    let files: string[] = [];
    try {
      files = readdirSync(UPLOADS_PATH);
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

  @Get('zip')
  async downloadAllAsZip(@Res() res: Response) {
    let files: string[] = [];
    try {
      files = readdirSync(UPLOADS_PATH);
    } catch (e) {
      return res.status(404).send('No files found.');
    }
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=all-files.zip');

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    for (const file of files) {
      archive.append(createReadStream(`${UPLOADS_PATH}/${file}`), {
        name: file,
      });
    }

    await archive.finalize();
  }
}
