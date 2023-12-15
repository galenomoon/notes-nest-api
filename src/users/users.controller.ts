import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }
}
