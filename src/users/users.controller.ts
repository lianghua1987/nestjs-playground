import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "../guards/auth.guard";

@Serialize(UserDto)
@Controller("auth")
export class UsersController {

  constructor(private userService: UsersService, private authService: AuthService) {
  }

  @Post("/signup")
  async signup(@Body() dto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(dto.email, dto.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
  async signin(@Body() dto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(dto.email, dto.password);
    session.userId = user.id;
    return user;
  }

  // @Get("/whoami")
  // async whoAmI(@Session() session: any) {
  //   return await this.userService.findOne(session.userId);
  // }

  @Get("/whoami")
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post("/signout")
  signout(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get("/:id")
  async findById(@Param("id") id: string) {
    console.log("Method is running");
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Get()
  async findAll(@Query("email") email: string) {
    console.log("Method is running");
    return await this.userService.find(email);
  }

  @Delete("/:id")
  async remove(@Param("id") id: string) {
    return await this.userService.remove(parseInt(id));
  }

  @Patch("/:id")
  async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(parseInt(id), dto);
  }

}
