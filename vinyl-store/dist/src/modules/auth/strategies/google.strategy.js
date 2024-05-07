"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
(0, dotenv_1.config)();
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:3001/auth/google/redirect',
            scope: ['email', 'profile'],
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        console.log(profile);
        const { id, name, emails, photos } = profile;
        const birthdate = await this.getBirthday(id, accessToken);
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            photo: photos[0].value,
            vinylList: [],
            birthdate: birthdate,
        };
        const currentUser = await this.userService.getUser(user);
        done(null, currentUser);
    }
    async getBirthday(id, accessToken) {
        const response = await fetch(`https://people.googleapis.com/v1/people/${id}?personFields=birthdays&key=AIzaSyBGMmNeLf0ysU5JIS6MAZDxKu0UIUBfLWE&access_token=${accessToken}`);
        const data = await response.json();
        const birthdate = data.birthdays[0].date;
        const dateOfBirth = new Date(birthdate.year, birthdate.month - 1, birthdate.day);
        return dateOfBirth ? dateOfBirth : null;
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map