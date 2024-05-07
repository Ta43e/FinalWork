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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guard/auth.guard");
const role_guard_1 = require("../../guard/role.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const query_loger_dto_1 = require("../loger/dto/query-loger.dto");
const mongoose_1 = require("mongoose");
let UserController = class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async showProfile(req, res) {
        const profile = await this.UserService.getProfile(req['_id']);
        res.status(201).json(profile);
    }
    async updateUser(req, res, updateUserDto) {
        const profile = await this.UserService.updateUser(req['_id'], updateUserDto);
        res.status(201).json(profile);
    }
    async deleteUser(req, res) {
        const deleteProfile = await this.UserService.deleteUser(req['_id']);
        res.clearCookie('jwt');
        res.status(201).json(deleteProfile);
    }
    async addReview(res, queryLogerDto) {
        const logs = await this.UserService.getAllLogs(queryLogerDto);
        return res.status(200).json(logs);
    }
    async buyVinyl(req, res, id) {
        const bouthVinyl = await this.UserService.buyVinyl(req['_id'], new mongoose_1.Types.ObjectId(id));
        res.status(201).json(bouthVinyl);
    }
    async localLogin(req, res, email) {
        const localLogin = await this.UserService.localLogin(email);
        res.cookie('jwt', localLogin, { signed: true, httpOnly: true });
        res.status(201).json(localLogin);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, roles_decorator_1.Roles)(['user', 'admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "showProfile", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, roles_decorator_1.Roles)(['user', 'admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_profile_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, roles_decorator_1.Roles)(['user', 'admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiTags)('Loger'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)('log'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_loger_dto_1.QueryLogerDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addReview", null);
__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, roles_decorator_1.Roles)(['user', 'admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Post)('buy/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "buyVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('USERS_TEST_LOGIN'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, common_1.Post)('localLogin/:email'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "localLogin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map