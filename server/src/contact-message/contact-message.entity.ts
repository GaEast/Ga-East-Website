import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isRead: boolean;
}
