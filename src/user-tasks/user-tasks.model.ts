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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  taskId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDone: boolean;
}
