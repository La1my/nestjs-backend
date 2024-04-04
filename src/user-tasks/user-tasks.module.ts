import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { UserTasks } from './user-tasks.model';
import { UserTasksService } from './user-tasks.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserTasks]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserTasksService],
  exports: [UserTasksService],
})
export class UserTasksModule {}
