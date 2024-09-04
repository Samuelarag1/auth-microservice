import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;

  const mockTokenService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword';
      const token = 'test-token';

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockTokenService.generateToken.mockResolvedValue(token);
      authService['Users'] = [
        { email: 'test@example.com', password: hashedPassword },
      ];

      const result = await authService.login(loginDto);

      expect(result).toEqual(token);
      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        email: loginDto.email,
      });
      expect(mockTokenService.generateToken).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };

      await expect(authService.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      authService['Users'] = [
        { email: 'test@example.com', password: 'hashedPassword' },
      ];

      await expect(authService.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
