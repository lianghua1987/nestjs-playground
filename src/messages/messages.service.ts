import { MessageRepository } from "./message.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagesService {

  constructor(public messageRepository: MessageRepository) {
  }

  findOne(id: string) {
    return this.messageRepository.findOne(id);
  }


  findAll() {
    return this.messageRepository.findAll();
  }


  create(content: string) {
    return this.messageRepository.create(content);
  }
}