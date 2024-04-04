import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { Task } from '../tasks/tasks.model';
import { UserTasks } from '../user-tasks/user-tasks.model';

interface UserCreationAttrs {
  login: string;
  password: string;
  isAdmin: boolean;
  positiveRating: number;
  negativeRating: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isAdmin: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  positiveRating: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  negativeRating: number;

  @BelongsToMany(() => Task, () => UserTasks)
  tasks: Array<Task>;
}
