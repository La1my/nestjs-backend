import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Task } from '../tasks/tasks.model';
import { User } from '../users/users.model';

interface UserTasksAttrs {
  userId: number;
  taskId: number;
  isDone: boolean;
}

@Table({ tableName: 'user_tasks', createdAt: false, updatedAt: false })
export class UserTasks extends Model<UserTasks, UserTasksAttrs> {
  @ApiProperty({ example: 10, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 5,
    description: 'Уникальный идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @ApiProperty({ example: 2, description: 'Уникальный идентификатор задачи' })
  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  taskId: number;

  @ApiProperty({
    example: true,
    description: 'Выполнена ли задача',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDone: boolean;
}
