import { IsEmail, IsString, Length } from 'class-validator';

export class CreateContactMessageDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 150)
  subject: string;

  @IsString()
  @Length(10, 2000)
  message: string;
}
