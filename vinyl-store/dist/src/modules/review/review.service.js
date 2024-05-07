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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Review_shema_1 = require("../../schemas/Review.shema");
const loger_service_1 = require("../loger/loger.service");
const create_loger_dto_1 = require("../loger/dto/create-loger.dto");
let ReviewService = class ReviewService {
    constructor(reviewModel, LogerService) {
        this.reviewModel = reviewModel;
        this.LogerService = LogerService;
    }
    async addReview(idUser, idVinyl, createReviewDto) {
        const review = await this.reviewModel.findOne({ user: idUser, vinyl: idVinyl });
        if (!review) {
            const reviewNew = {
                user: idUser,
                vinyl: idVinyl,
                comment: createReviewDto.comment,
                rating: createReviewDto.rating,
            };
            const log = {
                entity: create_loger_dto_1.EntityEnum.REVIEW,
                operation: create_loger_dto_1.OperationEnum.POST,
                data: `${idUser} added  review to ${idVinyl}`
            };
            await this.LogerService.log(log);
            return await this.reviewModel.create(reviewNew);
        }
        else {
            return review;
        }
    }
    async removeReview(idRewiew) {
        const review = await this.reviewModel.findOneAndDelete(idRewiew);
        const log = {
            entity: create_loger_dto_1.EntityEnum.REVIEW,
            operation: create_loger_dto_1.OperationEnum.DELETE,
            data: `${review.user} added deleted to ${review.vinyl}`
        };
        await this.LogerService.log(log);
        return review;
    }
    async getReview(idVinyl, queryReviewDto) {
        const { offset, limit } = queryReviewDto;
        const review = await this.reviewModel.find({ vinyl: idVinyl }).skip(offset).limit(limit).exec();
        if (review) {
            return review;
        }
        else {
            return null;
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Review_shema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        loger_service_1.LogerService])
], ReviewService);
//# sourceMappingURL=review.service.js.map