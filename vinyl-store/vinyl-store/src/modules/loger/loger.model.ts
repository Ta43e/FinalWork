import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Loger, LogerSchema } from 'src/schemas/Loger.shema';
import { LogerService } from './loger.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Loger.name, schema: LogerSchema }])],
  providers: [LogerService],
  exports: [LogerService],
}) 
export class LogerModule {} 