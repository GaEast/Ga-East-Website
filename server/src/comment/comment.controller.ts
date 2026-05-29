import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CommentDto } from './input/comment.dto';

@Controller('comment')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);
  constructor(private commentService: CommentService) {}

  @Post('/:postId')
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body(new ValidationPipe({ whitelist: true })) commentDto: CommentDto,
  ) {
    this.logger.debug(
      `create() called with createCommentDto: ${commentDto}, postId: ${postId}`,
    );
    return this.commentService.createComment(postId, commentDto);
  }

  @Get('/post/:postId')
  async getCommentsForPost(@Param('postId') postId: number) {
    return this.commentService.getCommentsForPost(postId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllComments() {
    return this.commentService.getAllComments();
  }

  @Delete('/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
}
