import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { UserDocument, UserSchema } from 'src/schemas/User.schema';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UserService } from 'src/modules/users/users.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly userService: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log(profile);
    const { id, name, emails, photos } = profile;
    const birthdate: Date = await this.getBirthday(id, accessToken);

    const user: CreateUserDto = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      photo: photos[0].value,
      vinylList: [],
      birthdate: birthdate,
    };
    const currentUser: UserDocument = await this.userService.getUser(user);
    done(null, currentUser);
  }


  private async getBirthday (id, accessToken): Promise<Date>  {
    const response = await fetch(`https://people.googleapis.com/v1/people/${id}?personFields=birthdays&key=AIzaSyBGMmNeLf0ysU5JIS6MAZDxKu0UIUBfLWE&access_token=${accessToken}`);
    const data = await response.json();
    const birthdate = data.birthdays[0].date;
    const dateOfBirth = new Date(birthdate.year, birthdate.month - 1, birthdate.day);
    return dateOfBirth ? dateOfBirth : null;
}
}