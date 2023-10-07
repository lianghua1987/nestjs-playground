import { CreateMessageDto } from './dtos/create-message.dto';
export declare class MessagesController {
    list(): any[];
    create(dto: CreateMessageDto): void;
    get(id: string): void;
}
