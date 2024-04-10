import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { SetTaskToUserDto } from '../users/dto';
import { UserTasks } from './user-tasks.model';

@Injectable()
export class UserTasksService {
  constructor(
    @InjectModel(UserTasks)
    private readonly userTasksRepository: typeof UserTasks,
  ) {}

  async setTaskStatus(dto: SetTaskToUserDto) {
    return await this.userTasksRepository.update(
      { ...dto },
      { where: { $userId$: dto.userId, $taskId$: dto.taskId } },
    );
  }

  async deleteUserTask(userId: number, taskId: number) {
    return await this.userTasksRepository.destroy({
      where: { $userId$: userId, $taskId$: taskId },
    });
  }
}
