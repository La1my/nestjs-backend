import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'laim', description: 'Логин' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: '14432', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Является ли пользователь админом',
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isAdmin: boolean;

  @ApiProperty({ example: 10, description: 'Положительный рейтинг' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  positiveRating: number;

  @ApiProperty({ example: 10, description: 'Отрицательный рейтинг' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  negativeRating: number;

  @ApiProperty({
    type: () => [Task],
    example: {
      id: 1,
      title: 'Купить хлеб',
      description: 'Нужно купить хлеб',
      duration: 10,
      isRequired: true,
      isDeletable: false,
      isActive: true,
    },
  })
  @BelongsToMany(() => Task, () => UserTasks)
  tasks: Array<Task>;
}
