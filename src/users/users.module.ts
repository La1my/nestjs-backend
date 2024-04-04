import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { Task } from '../tasks/tasks.model';
import { TasksModule } from '../tasks/tasks.module';
import { UserTasks } from '../user-tasks/user-tasks.model';
import { UserTasksModule } from '../user-tasks/user-tasks.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Task, UserTasks]),
    TasksModule,
    UserTasksModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
