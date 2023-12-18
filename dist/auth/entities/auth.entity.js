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
exports.AuthenticationEntity = void 0;
const class_transformer_1 = require("class-transformer");
const abstract_entity_1 = require("../../common/entities/abstract.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const auth_constants_1 = require("../constants/auth.constants");
let AuthenticationEntity = class AuthenticationEntity extends abstract_entity_1.AbstractEntity {
    async formatEmail() {
        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, auth_constants_1.SALT.ROUNDS);
        }
    }
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
    async validateRefreshToken(refreshToken) {
        return this.refreshToken === refreshToken;
    }
};
exports.AuthenticationEntity = AuthenticationEntity;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AuthenticationEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AuthenticationEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuthenticationEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.authentication),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", user_entity_1.UserEntity)
], AuthenticationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationEntity.prototype, "formatEmail", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationEntity.prototype, "hashPassword", null);
exports.AuthenticationEntity = AuthenticationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user_credentials" })
], AuthenticationEntity);
//# sourceMappingURL=auth.entity.js.map