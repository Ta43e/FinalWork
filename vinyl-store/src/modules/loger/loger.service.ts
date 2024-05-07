import { Injectable, Req, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loger } from 'src/schemas/Loger.shema';
import { CreateLogerDto } from './dto/create-loger.dto';

@Injectable()
export class LogerService {
  constructor(@InjectModel(Loger.name) private logerModel: Model<Loger>) {}

  async log(createLogerDto: CreateLogerDto): Promise<void> {
    await this.logerModel.create(createLogerDto);
  }

}