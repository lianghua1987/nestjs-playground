import { MessageRepository } from "./message.repository";
export declare class MessagesService {
    messageRepository: MessageRepository;
    constructor(messageRepository: MessageRepository);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(content: string): Promise<void>;
}
