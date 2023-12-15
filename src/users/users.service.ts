import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    const emailExists = await this.findByEmail(email);
    if (emailExists) throw new Error('Email already exists');

    const usernameExists = await this.findByUsername(username);
    if (usernameExists) throw new Error('Username already exists');

    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, username, password } = updateUserDto;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        password,
      },
    });
    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
