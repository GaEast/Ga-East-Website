import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './input/create-contact-message.dto';

@Controller('contact-message')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true })) dto: CreateContactMessageDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/read')
  @UseGuards(AuthGuard('jwt'))
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.service.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
