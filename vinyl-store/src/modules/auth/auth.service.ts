import { Injectable, Response } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/User.schema';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,) {}

  async googleLogin(req: { user: UserDocument; }) {
    if (!req.user) {
      return 'No user from google';
    }
    const payload = { _id: req.user._id, role: req.user.role };
    const jwt: string = await this.jwtService.signAsync(payload);
  
    return {
      message: 'User information from google',
      jwt: jwt,
    }
  } 

  async logout(@Response() res) {
    res.clearCookie('jwt');
    res.status(200).json('Succsess');
  }
}