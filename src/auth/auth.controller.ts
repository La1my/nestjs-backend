import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserAndToken } from '../interfaces/user-and-token.interface';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({
    status: 201,
    type: String,
  })
  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<Partial<UserAndToken>> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 201,
    type: String,
  })
  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<Partial<UserAndToken>> {
    return this.authService.register(dto);
  }
}
