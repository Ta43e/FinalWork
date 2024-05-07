"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)();
let MailService = class MailService {
    constructor() {
        this.configService = new config_1.ConfigService();
        this.sender = this.configService.get('SENDER');
        this.pass = this.configService.get('PASS_MAIL');
    }
    async sendMail(message, rec) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: this.sender,
                pass: this.pass,
            },
        });
        const mailOption = {
            from: this.sender,
            to: rec,
            subject: 'FinalWork ALEH KOZAK',
            text: message,
            html: `<i>${message}</i>`,
        };
        transporter.sendMail(mailOption, (error) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
            }
            else {
                console.log('Email sent successfully');
            }
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail-service.js.map