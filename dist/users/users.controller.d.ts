import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    signup(dto: CreateUserDto, session: any): Promise<User>;
    signin(dto: CreateUserDto, session: any): Promise<User>;
    whoAmI(user: User): Promise<User>;
    signout(session: any): void;
    findById(id: string): Promise<User>;
    findAll(email: string): Promise<User[]>;
    remove(id: string): Promise<User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<User>;
}
