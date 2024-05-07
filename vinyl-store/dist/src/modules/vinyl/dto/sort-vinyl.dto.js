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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortVinylDto = exports.SortFieldEnum = exports.OrderByEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var OrderByEnum;
(function (OrderByEnum) {
    OrderByEnum["ASC"] = "ASC";
    OrderByEnum["DESC"] = "DESC";
})(OrderByEnum || (exports.OrderByEnum = OrderByEnum = {}));
var SortFieldEnum;
(function (SortFieldEnum) {
    SortFieldEnum["NAME"] = "name";
    SortFieldEnum["AUTHOR_NAME"] = "authorName";
    SortFieldEnum["PRICE"] = "price";
})(SortFieldEnum || (exports.SortFieldEnum = SortFieldEnum = {}));
class SortVinylDto {
    constructor() {
        this.sortField = SortFieldEnum.NAME;
    }
}
exports.SortVinylDto = SortVinylDto;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'ASC' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SortVinylDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'NAME' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SortVinylDto.prototype, "sortField", void 0);
//# sourceMappingURL=sort-vinyl.dto.js.map