import { ApiProperty } from '@nestjs/swagger';

export class SetTaskToUserDto {
  @ApiProperty({ example: 5, description: 'Идентификатор пользователя' })
  userId: number;

  @ApiProperty({ example: 2, description: 'Идентификатор задачи' })
  taskId: number;

  @ApiProperty({ example: 2, description: 'Выполнена ли задача' })
  isDone: boolean;
}
