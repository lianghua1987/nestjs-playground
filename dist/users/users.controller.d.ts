import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signup(dto: CreateUserDto): Promise<void>;
    findById(id: string): Promise<import("./user.entity").User>;
    findAll(email: string): Promise<import("./user.entity").User[]>;
    remove(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<import("./user.entity").User>;
}
