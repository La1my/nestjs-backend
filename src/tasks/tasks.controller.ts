import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { isAdmin } from '../auth/admin.decorator';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(taskDto);
  }

  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Get()
  getAll(): Promise<Array<Task>> {
    return this.taskService.getAll();
  }

  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<number> {
    return this.taskService.deleteTask(id);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskDto: CreateTaskDto,
  ): Promise<[number, Task[]]> {
    return this.taskService.changeTask(id, taskDto);
  }
}
