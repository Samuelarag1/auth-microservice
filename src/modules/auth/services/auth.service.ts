import { LoginDTO } from './../dtos/login-user.dto';
import { CreateUserDTO } from './../dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import * as bcrypt from 'bcryptjs';

interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private Users: User[] = [];

  constructor(private readonly tokenService: TokenService) {}

  async create(createUserDto: CreateUserDTO): Promise<string> {
    const { email, password } = createUserDto;

    const userExist = this.Users?.find((user) => user?.email === email);
    if (userExist) throw new BadRequestException('User exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = { email, password: hashedPassword };
    this.Users.push(newUser);

    const token = await this.tokenService.generateToken({ email });

    return token;
  }

  async login(loginDto: LoginDTO): Promise<string> {
    const { email, password } = loginDto;

    const user = this.Users.find((usr) => usr.email === email);

    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Password');

    const token = await this.tokenService.generateToken({ email });

    return token;
  }
}
