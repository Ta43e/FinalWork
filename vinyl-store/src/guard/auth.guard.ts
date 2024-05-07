import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.signedCookies['jwt'];
      if (!token) {
        
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'secret',
        });
        request['_id'] = payload._id;
        request['role'] = payload.role;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  }
  