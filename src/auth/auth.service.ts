import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserAndToken } from '../interfaces/user-and-token.interface';
import { CreateUserDto } from '../users/dto';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto): Promise<Partial<UserAndToken>> {
    const user = await this.validateUser(dto);

    const token = this.generateToken(user);

    return { userId: user.id, token };
  }

  async register(dto: CreateUserDto): Promise<Partial<UserAndToken>> {
    const candidate = await this.userService.getUserByLogin(dto.login);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    const token = this.generateToken(user);

    return { userId: user.id, token };
  }

  private generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id,
      isAdmin: user.isAdmin,
      tasks: user.tasks,
    };
    return this.jwtService.sign(payload);
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(dto.login);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }

    const passwordEquals = await bcrypt.compare(dto.password, user?.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
