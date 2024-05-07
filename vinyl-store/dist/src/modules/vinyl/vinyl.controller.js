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
exports.VinylController = void 0;
const common_1 = require("@nestjs/common");
const vinyl_service_1 = require("./vinyl.service");
const auth_guard_1 = require("../../guard/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const query_vinyl_dto_1 = require("./dto/query-vinyl.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const role_guard_1 = require("../../guard/role.guard");
const create_vinyl_dto_1 = require("./dto/create-vinyl.dto");
const update_vinyl_dto_1 = require("./dto/update-vinyl.dto");
const search_vinyl_dto_1 = require("./dto/search-vinyl.dto");
const sort_vinyl_dto_1 = require("./dto/sort-vinyl.dto");
const mongoose_1 = require("mongoose");
let VinylController = class VinylController {
    constructor(VinylService) {
        this.VinylService = VinylService;
    }
    async showAllVinyl(query) {
        return this.VinylService.showAllVinyl(query);
    }
    async addVinyl(res, createVinylDto) {
        const result = await this.VinylService.createVinyl(createVinylDto);
        res.status(200).json(result);
    }
    async deleteVinyl(res, id) {
        const result = await this.VinylService.deleteVinyl(new mongoose_1.Types.ObjectId(id));
        res.status(200).json(result);
    }
    async updateVinyl(res, id, updateVinylDto) {
        const result = await this.VinylService.updateVinyl(new mongoose_1.Types.ObjectId(id), updateVinylDto);
        res.status(200).json(result);
    }
    async searchVinyl(res, searchVinylDto) {
        const vinyls = await this.VinylService.searchVinyl(searchVinylDto);
        return res.status(200).json(vinyls);
    }
    async sortVinyl(res, sortVinylDto) {
        const vinyls = await this.VinylService.sortVinyl(sortVinylDto);
        return res.status(200).json(vinyls);
    }
};
exports.VinylController = VinylController;
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_vinyl_dto_1.QueryVinylDto]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "showAllVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vinyl_dto_1.CreateVinylDto]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "addVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "deleteVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, roles_decorator_1.Roles)(['admin']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_vinyl_dto_1.UpdateVinylDto]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "updateVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, roles_decorator_1.Roles)(['admin', 'user']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_vinyl_dto_1.SearchVinylDto]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "searchVinyl", null);
__decorate([
    (0, swagger_1.ApiTags)('Vinyl'),
    (0, roles_decorator_1.Roles)(['admin', 'user']),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)('sort'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sort_vinyl_dto_1.SortVinylDto]),
    __metadata("design:returntype", Promise)
], VinylController.prototype, "sortVinyl", null);
exports.VinylController = VinylController = __decorate([
    (0, common_1.Controller)('vinyl'),
    __metadata("design:paramtypes", [vinyl_service_1.VinylService])
], VinylController);
//# sourceMappingURL=vinyl.controller.js.map