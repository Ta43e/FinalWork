import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../modules/auth/roles.decorator';

export enum Role {
    User = 'user',
    Admin = 'admin',
  }

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndMerge<Role[]>(Roles, [context.getHandler(), context.getClass()]);
    if (!allowedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request['role'];
    return allowedRoles.includes(userRole);
  } 
}