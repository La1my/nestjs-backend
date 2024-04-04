import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { UserTasks } from '../user-tasks/user-tasks.model';
import { User } from '../users/users.model';

interface TasksCreationAttrs {
  title: string;
  description: string;
  duration: number;
  isRequired?: boolean;
  isDeletable?: boolean;
  isActive: boolean;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TasksCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isRequired: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isDeletable: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isActive: boolean;

  @BelongsToMany(() => User, () => UserTasks)
  users: Array<User>;
}
