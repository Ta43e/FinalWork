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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let PaymentService = class PaymentService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.Stripe(configService.get('STRIPE_SECRET_KEY'));
    }
    async payment(totalAmount, orderId) {
        const paymentIntentParams = {
            amount: parseFloat((totalAmount * 100).toFixed(2)),
            currency: this.configService.getOrThrow('STRIPE_CURRENCY'),
            confirm: true,
            payment_method: 'pm_card_visa',
            metadata: { orderId: orderId },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        };
        const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentParams);
        return paymentIntent.client_secret;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map