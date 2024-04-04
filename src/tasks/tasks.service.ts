import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateTaskDto } from './dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.create(dto);
  }

  async getAll(): Promise<Array<Task>> {
    return await this.taskRepository.findAll({ include: { all: true } });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findByPk(id, { include: { all: true } });
  }

  async deleteTask(id: number) {
    return await this.taskRepository.destroy({ where: { id } });
  }

  async changeTask(id: number, dto: CreateTaskDto) {
    return await this.taskRepository.update(
      { ...dto },
      {
        where: { id },
        returning: true,
      },
    );
  }
}
