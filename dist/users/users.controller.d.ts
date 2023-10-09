import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthService } from "./auth.service";
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    signup(dto: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    signin(dto: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    whoAmI(session: any): Promise<import("./user.entity").User>;
    signout(session: any): void;
    findById(id: string): Promise<import("./user.entity").User>;
    findAll(email: string): Promise<import("./user.entity").User[]>;
    remove(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<import("./user.entity").User>;
}
