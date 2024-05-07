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
exports.CreateLogerDto = exports.EntityEnum = exports.OperationEnum = void 0;
const class_validator_1 = require("class-validator");
var OperationEnum;
(function (OperationEnum) {
    OperationEnum["POST"] = "POST";
    OperationEnum["PUT"] = "PUT";
    OperationEnum["DELETE"] = "DELETE";
})(OperationEnum || (exports.OperationEnum = OperationEnum = {}));
var EntityEnum;
(function (EntityEnum) {
    EntityEnum["USER"] = "USER";
    EntityEnum["VINYL"] = "VINYL";
    EntityEnum["REVIEW"] = "REVIEW";
})(EntityEnum || (exports.EntityEnum = EntityEnum = {}));
class CreateLogerDto {
}
exports.CreateLogerDto = CreateLogerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogerDto.prototype, "entity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogerDto.prototype, "operation", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogerDto.prototype, "data", void 0);
//# sourceMappingURL=create-loger.dto.js.map