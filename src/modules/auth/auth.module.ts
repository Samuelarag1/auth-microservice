import { AuthController } from './controllers/auth.controller';
import { TokenService } from './services/token.service';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config/config.module';

@Module({
  imports: [
    AppConfig,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
