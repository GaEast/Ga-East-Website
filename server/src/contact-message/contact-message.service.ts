import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactMessageDto } from './input/create-contact-message.dto';

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly repo: Repository<ContactMessage>,
  ) {}

  create(dto: CreateContactMessageDto): Promise<ContactMessage> {
    const msg = this.repo.create(dto);
    return this.repo.save(msg);
  }

  findAll(): Promise<ContactMessage[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async markAsRead(id: number): Promise<ContactMessage> {
    const msg = await this.repo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    msg.isRead = true;
    return this.repo.save(msg);
  }

  async remove(id: number): Promise<void> {
    const msg = await this.repo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    await this.repo.remove(msg);
  }
}
