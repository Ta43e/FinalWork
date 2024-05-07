import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review } from 'src/schemas/Review.shema';
import { User, UserDocument } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-profile.dto';
import { MailService } from '../mail/mail-service';
import { LogerService } from '../loger/loger.service';
import { CreateLogerDto, EntityEnum, OperationEnum } from '../loger/dto/create-loger.dto';
import { Loger, LogerDocument } from 'src/schemas/Loger.shema';
import { QueryLogerDto } from '../loger/dto/query-loger.dto';
import { Vinyl, VinylDocument } from 'src/schemas/Vinyl.shema';
import { PaymentService } from '../payment/payment.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(User.name) private reviewModel: Model<Review>,
        @InjectModel(Loger.name) private logerModel: Model<Loger>,
        @InjectModel(Vinyl.name) private vinylModel: Model<Vinyl>,
        private readonly jwtService: JwtService,
        private MailService: MailService,
        private LogerService: LogerService,
        private PaymentService: PaymentService,
 
    ) {}

    public async getProfile(_id: Types.ObjectId): Promise<ProfileUserDto> {
        
        const user = await this.userModel.findById(_id).populate('vinylList').exec();
        if (!user) {
          throw new Error('User not found');
        }
    
        const reviews = await this.reviewModel.find({ user: _id }).exec();
        const currentUserInfo: ProfileUserDto = {
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

    public async getUser(userDto: CreateUserDto): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findOne({email: userDto.email});
        if (user) {
            return user;
        } else {
            const log: CreateLogerDto = {
                entity: EntityEnum.USER,
                operation: OperationEnum.POST,
                data:  `${user.firstName} ` +
                        `${user.lastName}  ` +
                        `${user.birthdate} ` +
                        `${user.photo} `
            };
            await this.LogerService.log(log);
            return await this.userModel.create(userDto);
        }
    }

    public async buyVinyl(_id: Types.ObjectId, idVinyl: Types.ObjectId): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(_id);
        const vinyl: VinylDocument = await this.vinylModel.findById(idVinyl);
        if (user && vinyl) {
            const payment: string = await this.PaymentService.payment(vinyl.price, idVinyl);
            this.MailService.sendMail(payment, user.email);
            user.vinylList.push(vinyl);
            await user.save();
            const log: CreateLogerDto = {
                entity: EntityEnum.USER,
                operation: OperationEnum.PUT,
                data: 'TEST'
            };
            await this.LogerService.log(log);
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    public async updateUser(_id: Types.ObjectId, userDto: UpdateUserDto): Promise<UserDocument> {
        let user: UserDocument = await this.userModel.findById(_id);
        const beforUser = user;
        if (user) {
            user = Object.assign(user, userDto);
            await user.save();
            const log: CreateLogerDto = {
                entity: EntityEnum.USER,
                operation: OperationEnum.PUT,
                data:  `${beforUser.firstName} ==> ${user.firstName}   ` +
                        `${beforUser.lastName} ==> ${user.lastName}    ` +
                        `${beforUser.birthdate} ==> ${user.birthdate}  ` +
                        `${beforUser.photo} ==> ${user.photo} `
            };
            await this.LogerService.log(log);
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    public async deleteUser(_id: Types.ObjectId): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findOneAndDelete(_id);
        this.MailService.sendMail('you deleted your account', user.email);
        if (user) {
            await this.reviewModel.deleteMany({ user: user._id });
            const log: CreateLogerDto = {
                entity: EntityEnum.USER,
                operation: OperationEnum.DELETE,
                data: `${user.email} deleted`
            };
            await this.LogerService.log(log);
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    public async getAllLogs(queryLogerDto: QueryLogerDto): Promise<LogerDocument[]> {
        const { entity, operation } = queryLogerDto;
        const filter: any = {};
        if (entity) {
          filter.entity = entity;
        }
        if (operation) {
          filter.operation = operation;
        }
        return this.logerModel.find(filter).exec();
      }

      public async localLogin(email: string) {
        const user: UserDocument = await this.userModel.findOne({email: email})
        const payload = { _id: user._id, role: user.role };
        const jwt: string = await this.jwtService.signAsync(payload);
        return jwt;
      }
}
