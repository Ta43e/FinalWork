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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../../schemas/User.schema");
const mail_service_1 = require("../mail/mail-service");
const loger_service_1 = require("../loger/loger.service");
const create_loger_dto_1 = require("../loger/dto/create-loger.dto");
const Loger_shema_1 = require("../../schemas/Loger.shema");
const Vinyl_shema_1 = require("../../schemas/Vinyl.shema");
const payment_service_1 = require("../payment/payment.service");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, reviewModel, logerModel, vinylModel, jwtService, MailService, LogerService, PaymentService) {
        this.userModel = userModel;
        this.reviewModel = reviewModel;
        this.logerModel = logerModel;
        this.vinylModel = vinylModel;
        this.jwtService = jwtService;
        this.MailService = MailService;
        this.LogerService = LogerService;
        this.PaymentService = PaymentService;
    }
    async getProfile(_id) {
        const user = await this.userModel.findById(_id).populate('vinylList').exec();
        if (!user) {
            throw new Error('User not found');
        }
        const reviews = await this.reviewModel.find({ user: _id }).exec();
        const currentUserInfo = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            photo: user.photo,
            vinylList: user.vinylList,
            reviews,
        };
        return currentUserInfo;
    }
    async getUser(userDto) {
        const user = await this.userModel.findOne({ email: userDto.email });
        if (user) {
            return user;
        }
        else {
            const log = {
                entity: create_loger_dto_1.EntityEnum.USER,
                operation: create_loger_dto_1.OperationEnum.POST,
                data: `${user.firstName} ` +
                    `${user.lastName}  ` +
                    `${user.birthdate} ` +
                    `${user.photo} `
            };
            await this.LogerService.log(log);
            return await this.userModel.create(userDto);
        }
    }
    async buyVinyl(_id, idVinyl) {
        const user = await this.userModel.findById(_id);
        const vinyl = await this.vinylModel.findById(idVinyl);
        if (user && vinyl) {
            const payment = await this.PaymentService.payment(vinyl.price, idVinyl);
            this.MailService.sendMail(payment, user.email);
            user.vinylList.push(vinyl);
            await user.save();
            const log = {
                entity: create_loger_dto_1.EntityEnum.USER,
                operation: create_loger_dto_1.OperationEnum.PUT,
                data: 'TEST'
            };
            await this.LogerService.log(log);
            return user;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async updateUser(_id, userDto) {
        let user = await this.userModel.findById(_id);
        const beforUser = user;
        if (user) {
            user = Object.assign(user, userDto);
            await user.save();
            const log = {
                entity: create_loger_dto_1.EntityEnum.USER,
                operation: create_loger_dto_1.OperationEnum.PUT,
                data: `${beforUser.firstName} ==> ${user.firstName}   ` +
                    `${beforUser.lastName} ==> ${user.lastName}    ` +
                    `${beforUser.birthdate} ==> ${user.birthdate}  ` +
                    `${beforUser.photo} ==> ${user.photo} `
            };
            await this.LogerService.log(log);
            return user;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async deleteUser(_id) {
        const user = await this.userModel.findOneAndDelete(_id);
        this.MailService.sendMail('you deleted your account', user.email);
        if (user) {
            await this.reviewModel.deleteMany({ user: user._id });
            const log = {
                entity: create_loger_dto_1.EntityEnum.USER,
                operation: create_loger_dto_1.OperationEnum.DELETE,
                data: `${user.email} deleted`
            };
            await this.LogerService.log(log);
            return user;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async getAllLogs(queryLogerDto) {
        const { entity, operation } = queryLogerDto;
        const filter = {};
        if (entity) {
            filter.entity = entity;
        }
        if (operation) {
            filter.operation = operation;
        }
        return this.logerModel.find(filter).exec();
    }
    async localLogin(email) {
        const user = await this.userModel.findOne({ email: email });
        const payload = { _id: user._id, role: user.role };
        const jwt = await this.jwtService.signAsync(payload);
        return jwt;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(Loger_shema_1.Loger.name)),
    __param(3, (0, mongoose_1.InjectModel)(Vinyl_shema_1.Vinyl.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        mail_service_1.MailService,
        loger_service_1.LogerService,
        payment_service_1.PaymentService])
], UserService);
//# sourceMappingURL=users.service.js.map