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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../user/services/users.service");
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("../entities/auth.entity");
const user_already_exist_exception_1 = require("../exceptions/user-already-exist.exception");
const error_constraint_1 = require("../../database/constraints/error.constraint");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_not_found_exception_1 = require("../exceptions/user-not-found.exception");
let AuthenticationService = class AuthenticationService {
    constructor(authRepository, usersService, jwtService, configService) {
        this.authRepository = authRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Email or password are incorrect");
        }
        if (!user.authentication) {
            throw new common_1.ForbiddenException();
        }
        if (!await user.authentication.validatePassword(password)) {
            throw new common_1.UnauthorizedException("Email or password are incorrect");
        }
        return user;
    }
    async register(registration) {
        try {
            const authentication = await this.createAuthentication(registration);
            const user = await this.usersService.create(registration, authentication);
            const tokens = await this.makeNewTokens(user);
            await this.persistRefreshToken(user.authentication, tokens.refresh_token);
            return tokens;
        }
        catch (error) {
            if (error?.code === error_constraint_1.PostgresErrorCode.UniqueViolation) {
                throw new user_already_exist_exception_1.UserAlreadyExistException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async login(user) {
        const tokens = await this.makeNewTokens(user);
        await this.persistRefreshToken(user.authentication, tokens.refresh_token);
        return tokens;
    }
    async logout(userId) {
        const updatedAuth = { refreshToken: null };
        const user = await this.usersService.findOneByUserId(userId);
        if (!user) {
            throw new user_not_found_exception_1.UserNotFoundException();
        }
        const authUid = user.authentication.uuid;
        const authentication = await this.authRepository.update({ uuid: authUid }, updatedAuth);
        if (!authentication) {
            throw new common_1.InternalServerErrorException();
        }
        return !!authentication;
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findOneByUserId(userId);
        if (!user) {
            throw new user_not_found_exception_1.UserNotFoundException("User not found");
        }
        if (!user.authentication || !user.authentication.refreshToken) {
            throw new common_1.ForbiddenException("Access denied");
        }
        if (!await user.authentication.validateRefreshToken(refreshToken)) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
        const newTokens = await this.makeNewTokens(user);
        await this.persistRefreshToken(user.authentication, newTokens.refresh_token);
        return newTokens;
    }
    async createAuthentication(createAuthentication) {
        const authentication = this.authRepository.create(createAuthentication);
        return this.authRepository.save(authentication);
    }
    async persistRefreshToken(authentication, refreshToken) {
        authentication.refreshToken = refreshToken;
        await this.authRepository.save(authentication);
    }
    async makeNewTokens(userEntity) {
        const payload = {
            sub: userEntity.uuid,
            email: userEntity.authentication.email,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("JWT_ACCESS_SECRET"),
                expiresIn: '5d'
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("JWT_REFRESH_SECRET"),
                expiresIn: '15m'
            })
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auth_entity_1.AuthenticationEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationService);
//# sourceMappingURL=auth.service.js.map