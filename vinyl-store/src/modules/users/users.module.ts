import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Vinyl, VinylSchema } from 'src/schemas/Vinyl.shema';
import { Review, ReviewSchema } from 'src/schemas/Review.shema';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { LogerModule } from '../loger/loger.model';
import { Loger, LogerSchema } from 'src/schemas/Loger.shema';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [ 
    JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '3d' },
      }),
  MongooseModule.forFeature([{ name: Loger.name, schema: LogerSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Vinyl.name, schema: VinylSchema }]),
  MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), 
  MailModule, LogerModule, PaymentModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}