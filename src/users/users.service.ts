import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { TasksService } from '../tasks/tasks.service';
import { UserTasksService } from '../user-tasks/user-tasks.service';
import { CreateUserDto, SetTaskToUserDto } from './dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { User } from './users.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly taskService: TasksService,
    private readonly userTasksService: UserTasksService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    let activeTasks = [];
    activeTasks = await this.taskService
      .getAll()
      .then((tasks) => tasks.filter((task) => task.isActive === true));

    await user.$set('tasks', activeTasks);
    user.tasks = [];

    return user;
  }

  async getAllUsers(): Promise<Array<User>> {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });

    for (const user of users) {
      user.password = undefined;
    }

    return users;
  }

  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findByPk(userId, {
      include: { all: true },
    });
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }

  async setTaskToUser(dto: SetTaskToUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    const task = await this.taskService.getTaskById(dto.taskId);

    await user.$add('tasks', task);
    user.tasks = [task];

    return user;
  }

  async setTaskToAll(taskId: number): Promise<Array<User>> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    const task = await this.taskService.getTaskById(taskId);

    for (const user of users) {
      await user.$add('tasks', task);
    }

    return users;
  }

  async setTaskStatus(dto: SetTaskToUserDto): Promise<User> {
    await this.userTasksService.setTaskStatus(dto);

    if (dto.isDone) {
      const user = await this.userRepository.findByPk(dto.userId, {
        include: { all: true },
      });
      user.positiveRating += 1;
      await this.userRepository.update(user.dataValues, {
        where: { $id$: user.id },
        returning: true,
      });
    } else if (dto.isDone === false) {
      const user = await this.userRepository.findByPk(dto.userId, {
        include: { all: true },
      });
      user.positiveRating += 1;
      await this.userRepository.update(user.dataValues, {
        where: { $id$: user.id },
        returning: true,
      });
    }

    return await this.userRepository.findByPk(dto.userId, {
      include: { all: true },
    });
  }

  async changeUserData(id: number, dto: ChangeUserDto) {
    return await this.userRepository.update(
      { ...dto },
      { where: { id }, returning: true },
    );
  }

  async getUsersSortByRating() {
    const users = await this.userRepository.findAll();
    users.sort((cur, next) => next.positiveRating - cur.positiveRating);
    const userList = [];
    let placement = 0;

    users.forEach((user) => {
      placement++;
      userList.push({
        id: user.id,
        placement,
        nickname: user.login,
        doneTasks: user.positiveRating,
      });
    });

    console.log(userList);

    return userList;
  }

  async getUserPosition(
    id: number,
  ): Promise<{ user: User; placement: number }> {
    const sortUsers = await this.getUsersSortByRating();

    const user = await this.userRepository.findByPk(id);
    const placement = sortUsers.findIndex((user) => user.id === Number(id)) + 1;

    return {
      user: user.dataValues,
      placement,
    };
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkRequiredTaskIsDone(): Promise<void> {
    const users = await this.userRepository.findAll({ include: { all: true } });

    for (const user of users) {
      for (const userTask of user.dataValues.tasks) {
        if (
          userTask.dataValues.isRequired &&
          !userTask.dataValues.isActive &&
          !userTask.dataValues['UserTasks'].dataValues.isDone
        ) {
          user.dataValues.positiveRating -= 1;
        }

        if (!userTask.dataValues.isActive) {
          await this.userTasksService.deleteUserTask(user.id, userTask.id);
        }
      }
      await this.userRepository.update(user.dataValues, {
        where: { $id$: user.id },
        returning: true,
      });
    }
  }
}
