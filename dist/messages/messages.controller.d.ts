import { CreateMessageDto } from "./dtos/create-message.dto";
import { MessagesService } from "./messages.service";
export declare class MessagesController {
    messageService: MessagesService;
    constructor(messageService: MessagesService);
    list(): Promise<any>;
    create(dto: CreateMessageDto): Promise<void>;
    get(id: string): Promise<any>;
}
