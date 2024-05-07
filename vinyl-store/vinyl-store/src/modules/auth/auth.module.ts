import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from 'src/guard/auth.guard';

@Module({
  imports: [
    JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '3d' },
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AuthenticationGuard],
  exports: [AuthService, GoogleStrategy, AuthenticationGuard],
}) 
export class AuthModule {} 