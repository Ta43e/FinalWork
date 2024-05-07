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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
const auth_guard_1 = require("../../guard/auth.guard");
const role_guard_1 = require("../../guard/role.guard");
const create_review_dto_1 = require("./dto/create-review.dto");
const query_review_dto_1 = require("./dto/query-review.dto");
const mongoose_1 = require("mongoose");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReview(res, idVinyl, queryReviewDto) {
        const review = await this.reviewService.getReview(new mongoose_1.Types.ObjectId(idVinyl), queryReviewDto);
        return res.status(200).json(review);
    }
    async addReview(Req, res, idVinyl, createReviewDto) {
        const review = await this.reviewService.addReview(Req['_id'], new mongoose_1.Types.ObjectId(idVinyl), createReviewDto);
        return res.status(200).json(review);
    }
    async removeReview(res, idVinyl) {
        const review = await this.reviewService.removeReview(new mongoose_1.Types.ObjectId(idVinyl));
        return res.status(200).json(review);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, swagger_1.ApiTags)('Review'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, query_review_dto_1.QueryReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReview", null);
__decorate([
    (0, swagger_1.ApiTags)('Review'),
    (0, roles_decorator_1.Roles)(['admin', 'user']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Post)('add/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addReview", null);
__decorate([
    (0, swagger_1.ApiTags)('Review'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "removeReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map