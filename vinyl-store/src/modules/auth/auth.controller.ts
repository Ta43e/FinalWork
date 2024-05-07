import {Controller, Get, Post, Req, Response, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google')) 
  async googleAuth(@Req() req) {} 

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Response({passthrough: true}) res) {
      const payload = await this.authService.googleLogin(req);
      if (!payload || typeof payload === 'string') {
        return res.status(401).send('No user from google');
      } else {
        res.cookie('jwt', payload.jwt, { signed: true, httpOnly: true });
        return res.json({ message: 'User information from google', jwt: payload.jwt });
      }
  }

  @Post('google/logout')
  logout(@Response() res) {
    return this.authService.logout(res);
  }
} 