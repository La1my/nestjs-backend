import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ChangeUserDto {
  @ApiProperty({ example: 'Laim_god', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'login занят' })
  readonly login: string;
  @ApiProperty({ example: '1241241', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({
    example: true,
    description: 'Является ли пользователь админом',
  })
  readonly isAdmin: boolean;

  @ApiProperty({ example: 10, description: 'Положительный рейтинг' })
  positiveRating: number;

  @ApiProperty({ example: 10, description: 'Отрицательный рейтинг' })
  negativeRating: number;
}
