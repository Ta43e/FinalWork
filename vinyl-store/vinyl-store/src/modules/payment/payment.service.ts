import {
    Injectable,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { Stripe } from 'stripe';
  
  @Injectable()
  export class PaymentService {
    readonly stripe: Stripe;
    constructor(readonly configService: ConfigService) {
      this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'));
    }

    async payment(totalAmount: number, orderId: any) {
      const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
        amount: parseFloat((totalAmount * 100).toFixed(2)),
        currency: this.configService.getOrThrow<string>('STRIPE_CURRENCY'),
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
  }