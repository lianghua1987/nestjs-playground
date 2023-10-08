import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {

  constructor(public messageService: MessagesService) {
  }

  @Get()
  list() {
    return this.messageService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto.content);
  }

  @Get("/:id")
  async get(@Param("id") id: string) {
    const message = await this.messageService.findOne(id);

    if (!message) {
      throw  new NotFoundException("Message not found");
    }

    return message;

  }
}
