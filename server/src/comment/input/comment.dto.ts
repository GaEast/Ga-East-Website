import { IsString, IsEmail, Length, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CommentDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsString()
  @Length(5, 500)
  message: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  replyToId?: number;
}
