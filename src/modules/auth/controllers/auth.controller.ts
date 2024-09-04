import { LoginDTO } from './../dtos/login-user.dto';
import { AuthService } from './../services/auth.service';
import { CreateUserDTO } from './../dtos/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: CreateUserDTO): Promise<{ token: string }> {
    const token = await this.authService.create(user);

    return { token };
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDTO): Promise<{ token: string }> {
    const token = await this.authService.login(loginDto);
    return { token };
  }
}
