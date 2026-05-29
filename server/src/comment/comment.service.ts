import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { CommentDto } from './input/comment.dto';
import { BlogPost } from '../post/post.entity';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(BlogPost)
    private postRepository: Repository<BlogPost>,
  ) {}

  async createComment(postId: number, commentDto: CommentDto): Promise<Comment> {
    const { email, name, website, message, replyToId } = commentDto;

    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ name, email, website });
      await this.userRepository.save(user);
    }

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }

    let replyTo: Comment | null = null;
    if (replyToId) {
      replyTo = await this.commentRepository.findOne({ where: { id: replyToId } });
      if (!replyTo) {
        throw new NotFoundException(`Comment with ID "${replyToId}" not found`);
      }
    }

    const comment = this.commentRepository.create({
      post,
      message,
      user,
      ...(replyTo ? { replyTo } : {}),
    });

    await this.commentRepository.save(comment);
    return comment;
  }

  async getCommentsForPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId }, replyTo: IsNull() },
      relations: ['user', 'replies', 'replies.user'],
    });
  }
}
