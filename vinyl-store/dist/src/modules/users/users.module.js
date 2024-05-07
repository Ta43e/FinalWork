"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const mongoose_1 = require("@nestjs/mongoose");
const User_schema_1 = require("../../schemas/User.schema");
const Vinyl_shema_1 = require("../../schemas/Vinyl.shema");
const Review_shema_1 = require("../../schemas/Review.shema");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
const loger_model_1 = require("../loger/loger.model");
const Loger_shema_1 = require("../../schemas/Loger.shema");
const payment_module_1 = require("../payment/payment.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '3d' },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: Loger_shema_1.Loger.name, schema: Loger_shema_1.LogerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: User_schema_1.User.name, schema: User_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Vinyl_shema_1.Vinyl.name, schema: Vinyl_shema_1.VinylSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Review_shema_1.Review.name, schema: Review_shema_1.ReviewSchema }]),
            mail_module_1.MailModule, loger_model_1.LogerModule, payment_module_1.PaymentModule
        ],
        controllers: [users_controller_1.UserController],
        providers: [users_service_1.UserService],
        exports: [users_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=users.module.js.map