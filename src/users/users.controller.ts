import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { isAdmin } from '../auth/admin.decorator';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, SetTaskToUserDto } from './dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Get()
  getAll(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/:id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Присвоение задачи пользователю' })
  @ApiResponse({ status: 201, type: User })
  @Post('/task')
  setTaskToUser(@Body() dto: SetTaskToUserDto): Promise<User> {
    return this.usersService.setTaskToUser(dto);
  }

  @ApiOperation({ summary: 'Присвоение задачи всем пользователям' })
  @ApiResponse({ status: 201, type: [User] })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Post('/taskAll/:taskId')
  taskToAll(@Param('taskId') taskId: number): Promise<Array<User>> {
    return this.usersService.setTaskToAll(taskId);
  }

  @ApiOperation({ summary: 'Изменение статуса задачи у пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('task/change_status')
  changeUserTaskStatus(@Body() dto: SetTaskToUserDto): Promise<User> {
    return this.usersService.setTaskStatus(dto);
  }

  @ApiOperation({ summary: 'Изменение данных пользователя' })
  @ApiResponse({ status: 200, type: User })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Put(':userId')
  changeUser(
    @Param('userId') userId: number,
    @Body() dto: ChangeUserDto,
  ): Promise<[number, User[]]> {
    return this.usersService.changeUserData(userId, dto);
  }
}
