/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { Review } from 'src/schemas/Review.shema';
import { User, UserDocument } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-profile.dto';
import { MailService } from '../mail/mail-service';
import { LogerService } from '../loger/loger.service';
import { Loger, LogerDocument } from 'src/schemas/Loger.shema';
import { QueryLogerDto } from '../loger/dto/query-loger.dto';
import { Vinyl } from 'src/schemas/Vinyl.shema';
import { PaymentService } from '../payment/payment.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private reviewModel;
    private logerModel;
    private vinylModel;
    private readonly jwtService;
    private MailService;
    private LogerService;
    private PaymentService;
    constructor(userModel: Model<User>, reviewModel: Model<Review>, logerModel: Model<Loger>, vinylModel: Model<Vinyl>, jwtService: JwtService, MailService: MailService, LogerService: LogerService, PaymentService: PaymentService);
    getProfile(_id: Types.ObjectId): Promise<ProfileUserDto>;
    getUser(userDto: CreateUserDto): Promise<UserDocument>;
    buyVinyl(_id: Types.ObjectId, idVinyl: Types.ObjectId): Promise<UserDocument>;
    updateUser(_id: Types.ObjectId, userDto: UpdateUserDto): Promise<UserDocument>;
    deleteUser(_id: Types.ObjectId): Promise<UserDocument>;
    getAllLogs(queryLogerDto: QueryLogerDto): Promise<LogerDocument[]>;
    localLogin(email: string): Promise<string>;
}
