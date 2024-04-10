import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';
import { Task } from './tasks/tasks.model';
import { TasksModule } from './tasks/tasks.module';
import { UserTasks } from './user-tasks/user-tasks.model';
import { UserTasksModule } from './user-tasks/user-tasks.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Task, UserTasks],
      autoLoadModels: true,
    }),
    UsersModule,
    TasksModule,
    UserTasksModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
