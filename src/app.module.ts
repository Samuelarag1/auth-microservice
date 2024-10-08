import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
