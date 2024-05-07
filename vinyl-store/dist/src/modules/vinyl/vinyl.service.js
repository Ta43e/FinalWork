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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinylService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Review_shema_1 = require("../../schemas/Review.shema");
const User_schema_1 = require("../../schemas/User.schema");
const Vinyl_shema_1 = require("../../schemas/Vinyl.shema");
const sort_vinyl_dto_1 = require("./dto/sort-vinyl.dto");
const loger_service_1 = require("../loger/loger.service");
const create_loger_dto_1 = require("../loger/dto/create-loger.dto");
let VinylService = class VinylService {
    constructor(userModel, vinylModel, reviewModel, LogerService) {
        this.userModel = userModel;
        this.vinylModel = vinylModel;
        this.reviewModel = reviewModel;
        this.LogerService = LogerService;
    }
    async showAllVinyl(query) {
        const { offset, limit } = query;
        const vinyls = await this.vinylModel.find().skip(offset).limit(limit).exec();
        return this.showMoreInformationAboutVinyl(vinyls);
    }
    async showMoreInformationAboutVinyl(vinyls) {
        const vinylsWithDetails = await Promise.all(vinyls.map(async (vinyl) => {
            const reviews = await this.reviewModel.find({ vinyl: vinyl._id }).exec();
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
            const firstReview = reviews.length > 0 ? reviews[0] : null;
            if (firstReview) {
                const vinylData = {
                    _id: vinyl._id,
                    name: vinyl.name,
                    authorName: vinyl.authorName,
                    description: vinyl.description,
                    price: vinyl.price,
                    firstReview: firstReview.comment,
                    averageRating,
                };
                return vinylData;
            }
            else {
                const vinylData = {
                    _id: vinyl._id,
                    name: vinyl.name,
                    authorName: vinyl.authorName,
                    description: vinyl.description,
                    price: vinyl.price,
                    averageRating,
                };
                return vinylData;
            }
        }));
        return vinylsWithDetails;
    }
    async createVinyl(createVinylDto) {
        const log = {
            entity: create_loger_dto_1.EntityEnum.VINYL,
            operation: create_loger_dto_1.OperationEnum.POST,
            data: `${createVinylDto.name}  ` +
                `${createVinylDto.authorName}  ` +
                `${createVinylDto.photo} ` +
                `${createVinylDto.description} ` +
                `${createVinylDto.price} `
        };
        await this.LogerService.log(log);
        return await this.vinylModel.create(createVinylDto);
    }
    async updateVinyl(_id, vinylDto) {
        let vinyl = await this.vinylModel.findById(_id);
        console.log(_id);
        console.log(vinyl);
        const beforVinyl = vinyl;
        if (vinyl) {
            vinyl = Object.assign(vinyl, vinylDto);
            await vinyl.save();
            const log = {
                entity: create_loger_dto_1.EntityEnum.VINYL,
                operation: create_loger_dto_1.OperationEnum.PUT,
                data: `${beforVinyl.name}       ==> ${vinyl.name}          ` +
                    `${beforVinyl.authorName} ==> ${vinyl.authorName}    ` +
                    `${beforVinyl.photo}      ==>  ${vinyl.photo}        ` +
                    `${beforVinyl.description}==>  ${vinyl.description}  ` +
                    `${beforVinyl.price}      ==>  ${vinyl.price}        `
            };
            await this.LogerService.log(log);
            return vinyl;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async deleteVinyl(_id) {
        const vinyl = await this.vinylModel.findById(_id);
        if (vinyl) {
            const users = await this.userModel.find({ vinylList: _id });
            await Promise.all(users.map(async (user) => {
                user.vinylList = user.vinylList.filter((v) => v._id !== _id);
                await user.save();
            }));
            await vinyl.save();
            const log = {
                entity: create_loger_dto_1.EntityEnum.VINYL,
                operation: create_loger_dto_1.OperationEnum.DELETE,
                data: `${vinyl.name} deleted`
            };
            await this.LogerService.log(log);
            return await this.vinylModel.findByIdAndDelete(_id);
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async searchVinyl(searchVinylDto) {
        const { name, authorName } = searchVinylDto;
        const query = {};
        if (name) {
            query['name'] = { $regex: new RegExp(name, 'i') };
        }
        if (authorName) {
            query['authorName'] = { $regex: new RegExp(authorName, 'i') };
        }
        const searchVinyl = await this.vinylModel.find(query).exec();
        return await this.showMoreInformationAboutVinyl(searchVinyl);
    }
    async sortVinyl(sortVinylDto) {
        const { sortField, orderBy } = sortVinylDto;
        const sortOptions = {};
        if (sortField && orderBy) {
            sortOptions[sortField] = orderBy === sort_vinyl_dto_1.OrderByEnum.ASC ? 1 : -1;
        }
        let query = this.vinylModel.find();
        const sortedVinyls = await query.sort(sortOptions).exec();
        return await this.showMoreInformationAboutVinyl(sortedVinyls);
    }
};
exports.VinylService = VinylService;
exports.VinylService = VinylService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(Vinyl_shema_1.Vinyl.name)),
    __param(2, (0, mongoose_1.InjectModel)(Review_shema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        loger_service_1.LogerService])
], VinylService);
//# sourceMappingURL=vinyl.service.js.map