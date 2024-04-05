import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 5, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Купить хлеб', description: 'Название задачи' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Нужно купить хлеб', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 10, description: 'Срок выполнения в днях' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @ApiProperty({ example: true, description: 'Обязательна ли задача' })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isRequired: boolean;

  @ApiProperty({ example: true, description: 'Удаляема ли задача' })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isDeletable: boolean;

  @ApiProperty({ example: true, description: 'Активна ли задача' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isActive: boolean;

  @BelongsToMany(() => User, () => UserTasks)
  users: Array<User>;
}
