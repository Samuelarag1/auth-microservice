import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../services/auth.service';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { LoginDTO } from '../../dtos/login-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    create: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('registerUser', () => {
    it('should register a user and return a token', async () => {
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      const token = 'test-token';
      mockAuthService.create.mockResolvedValue(token);

      expect(await authController.registerUser(createUserDto)).toEqual({
        token,
      });
      expect(mockAuthService.create).toHaveBeenCalledWith(createUserDto);
      expect(mockAuthService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if user creation fails', async () => {
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockAuthService.create.mockRejectedValue(
        new BadRequestException('User exists'),
      );

      await expect(authController.registerUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('loginUser', () => {
    it('should log in a user and return a token', async () => {
      const loginDto: LoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      const token = 'test-token';
      mockAuthService.login.mockResolvedValue(token);

      expect(await authController.loginUser(loginDto)).toEqual({ token });
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if login fails', async () => {
      const loginDto: LoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockAuthService.login.mockRejectedValue(
        new BadRequestException('Invalid credentials'),
      );

      await expect(authController.loginUser(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
