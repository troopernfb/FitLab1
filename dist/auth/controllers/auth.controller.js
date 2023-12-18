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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const auth_service_1 = require("../services/auth.service");
const dtos_1 = require("../dtos");
const jwt_refresh_auth_guard_1 = require("../guards/jwt-refresh-auth.guard");
const jwt_access_auth_guard_1 = require("../guards/jwt-access-auth.guard");
const get_user_id_decorator_1 = require("../../common/decorators/get-user-id.decorator");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let AuthenticationController = class AuthenticationController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registrationDto) {
        return this.authService.register(registrationDto);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async logout(userId) {
        return this.authService.logout(userId);
    }
    async refresh(user) {
        const userId = user['sub'];
        const refreshToken = user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RegistrationDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_auth_guard_1.JwtAccessAuthGuard),
    (0, common_1.Get)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_user_id_decorator_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Get)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refresh", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService])
], AuthenticationController);
//# sourceMappingURL=auth.controller.js.map