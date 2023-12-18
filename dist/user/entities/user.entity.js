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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/entities/abstract.entity");
const auth_entity_1 = require("../../auth/entities/auth.entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.AuthenticationEntity, (authentication) => authentication.user, { eager: true, nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", auth_entity_1.AuthenticationEntity)
], UserEntity.prototype, "authentication", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user_details" })
], UserEntity);
//# sourceMappingURL=user.entity.js.map