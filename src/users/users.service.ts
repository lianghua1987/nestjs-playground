import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  async signup(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  async find(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw  new NotFoundException(`User not found, id: ${id}`);
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw  new NotFoundException(`User not found, id: ${id}`);
    }

    return this.repo.remove(user);
  }
}
