import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Review, ReviewSchema } from "src/schemas/Review.shema";
import { User, UserSchema } from "src/schemas/User.schema";
import { Vinyl, VinylSchema } from "src/schemas/Vinyl.shema";
import { VinylController } from "./vinyl.controller";
import { VinylService } from "./vinyl.service";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { LogerModule } from "../loger/loger.model";

@Module({
  imports: [ 
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '3d' },
    }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Vinyl.name, schema: VinylSchema }]),
  MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  AuthModule, LogerModule
  ],
  controllers: [VinylController],
  providers: [VinylService],
  exports: [VinylService],
})
export class VinylModule {}