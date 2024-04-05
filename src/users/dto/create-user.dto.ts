import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Laim_god', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'login занят' })
  readonly login: string;
  @ApiProperty({ example: '1241241', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
