import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto, SetTaskToUserDto } from './dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { isAdmin } from '../auth/admin.decorator';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Get()
  getAll(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post('/task')
  setTaskToUser(@Body() dto: SetTaskToUserDto): Promise<User> {
    return this.usersService.setTaskToUser(dto);
  }

  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Post('/taskAll/:taskId')
  taskToAll(@Param('taskId') taskId: number): Promise<Array<User>> {
    return this.usersService.setTaskToAll(taskId);
  }

  @Post('task/change_status')
  changeUserTaskStatus(@Body() dto: SetTaskToUserDto): Promise<User> {
    return this.usersService.setTaskStatus(dto);
  }
}
