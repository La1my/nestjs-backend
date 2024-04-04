import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Значение должно быть числом' })
  readonly duration: number;
  readonly isRequired: boolean;
  readonly isDeletable: boolean;
  readonly isActive: boolean;
}
