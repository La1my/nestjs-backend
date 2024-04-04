import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { UserTasks } from '../user-tasks/user-tasks.model';
import { User } from '../users/users.model';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, User, UserTasks]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
