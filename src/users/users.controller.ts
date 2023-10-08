import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("auth")
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @Post("/signup")
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.userService.signup(dto.email, dto.password);
    console.log(user);
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if(!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Get()
 async findAll(@Query("email") email: string) {
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
