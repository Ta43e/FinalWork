import { Controller, Get, UseGuards, Request, Query, Res, Body, Post, Param } from '@nestjs/common';
import {UserService} from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from '../auth/roles.decorator';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-profile.dto';
import { UserDocument } from 'src/schemas/User.schema';
import { QueryLogerDto } from '../loger/dto/query-loger.dto';
import { Types } from 'mongoose';
 
    @Controller('user')
    export class UserController {
    constructor(private UserService: UserService) {}

    @ApiTags('User')
    @Roles(['USER', 'ADMIN'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get()
    async showProfile(@Request() req: Request, @Res() res) {
      const profile: ProfileUserDto =  await this.UserService.getProfile(req['_id']);
      res.status(201).json(profile);
    }

    @ApiTags('User')
    @Roles(['USER', 'ADMIN'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Post('update')
    async updateUser(@Request() req: Request, @Res() res, @Body() updateUserDto: UpdateUserDto) {
      const profile: UserDocument =  await this.UserService.updateUser(req['_id'], updateUserDto);
      res.status(201).json(profile);
    }

    @ApiTags('User')
    @Roles(['USER', 'ADMIN'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Post('delete')
    async deleteUser(@Request() req: Request, @Res() res) {
      const deleteProfile: UserDocument =  await this.UserService.deleteUser(req['_id']);
      res.clearCookie('jwt');
      res.status(201).json(deleteProfile);
    }

    @ApiTags('Loger')
    @Roles(['ADMIN'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Get('log')
    async addReview(@Res() res, @Query() queryLogerDto: QueryLogerDto) {
      const logs = await this.UserService.getAllLogs(queryLogerDto);
      return res.status(200).json(logs);
    }

    @ApiTags('User')
    @Roles(['USER', 'ADMIN'])
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Post('buy/:id')
    async buyVinyl(@Request() req: Request, @Res() res, @Param('id') id: string) {
      const bouthVinyl: UserDocument =  await this.UserService.buyVinyl(req['_id'], new Types.ObjectId(id));
      res.status(201).json(bouthVinyl);
    }


    @ApiTags('USERS_TEST_LOGIN')
    @Post('localLogin/:email')
    async localLogin(@Request() req: Request, @Res() res, @Param('email') email: string) {
      const localLogin: string =  await this.UserService.localLogin(email);
      res.cookie('jwt', localLogin, { signed: true, httpOnly: true });
      res.status(201).json(localLogin);
    }
    
  }
  