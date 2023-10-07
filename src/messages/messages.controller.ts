import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  list() {
    return [];
  }

  @Post()
  create(@Body() dto: CreateMessageDto) {
    console.log(dto);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    console.log(id);
  }
}
