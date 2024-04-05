import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Купить хлеб',
    description: 'Название задачи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Нужно купить хлеб',
    description: 'Описание задачи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({
    example: 10,
    description: 'Длительность задачи в днях',
  })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Значение должно быть числом' })
  readonly duration: number;

  @ApiProperty({ example: true, description: 'Обязательна ли задача' })
  readonly isRequired: boolean;

  @ApiProperty({ example: true, description: 'Удаляема ли задача' })
  readonly isDeletable: boolean;

  @ApiProperty({ example: true, description: 'Активна ли задача' })
  readonly isActive: boolean;
}
