import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/modules/users/users.service';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
    private getBirthday;
}
export {};
