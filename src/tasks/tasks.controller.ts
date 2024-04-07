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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 201, type: Task })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() taskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Get()
  getAll(): Promise<Array<Task>> {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200, type: Task })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<number> {
    return this.taskService.deleteTask(id);
  }

  @ApiOperation({ summary: 'Получение задачи по айди' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id')
  getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Изменение задачи' })
  @ApiResponse({ status: 200, type: [Task] })
  @isAdmin(true)
  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() taskDto: CreateTaskDto,
  ): Promise<[number, Task[]]> {
    return this.taskService.changeTask(id, taskDto);
  }

  @ApiOperation({ summary: 'Получение обязательной задачи' })
  @ApiResponse({ status: 200, type: Task })
  @Get('/required')
  getRequiredTask(): Promise<Task> {
    return this.taskService.getRequiredTask();
  }
}
