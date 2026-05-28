import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './contact-message.entity';
import { ContactMessageController } from './contact-message.controller';
import { ContactMessageService } from './contact-message.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage]), AdminModule],
  controllers: [ContactMessageController],
  providers: [ContactMessageService],
})
export class ContactMessageModule {}
