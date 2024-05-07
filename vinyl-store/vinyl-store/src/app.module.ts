import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VinylModule } from './modules/vinyl/vinyl.module';
import { UserModule } from './modules/users/users.module';
import { ReviewModule } from './modules/review/review.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    VinylModule,
    UserModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
