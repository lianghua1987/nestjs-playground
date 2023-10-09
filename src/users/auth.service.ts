import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

  constructor(private userService: UsersService) {
  }

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if (users.length) throw new BadRequestException("Email in use");

    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString("hex")}`;

    const user = this.userService.signup(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException("User not found");
    const [salt, hash] = user.password.split(".");
    const _hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== _hash.toString("hex")) throw new BadRequestException("Bad password");
    return user;
  }
}
