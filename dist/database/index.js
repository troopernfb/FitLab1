"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../app/constants");
const strategies_1 = require("./strategies");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    type: "postgres",
                    host: configService.get("POSTGRES_HOST"),
                    port: configService.get("POSTGRES_PORT"),
                    username: configService.get("POSTGRES_USER"),
                    password: configService.get("POSTGRES_PASSWORD"),
                    database: configService.get("POSTGRES_DB"),
                    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                    namingStrategy: new strategies_1.SnakeNamingStrategy(),
                    synchronize: configService.get("NODE_ENV") === constants_1.NODE_ENV.DEVELOPMENT,
                    logging: configService.get("NODE_ENV") === constants_1.NODE_ENV.DEVELOPMENT,
                    extra: { charset: "utf8mb4_unicode_ci" },
                }),
            })
        ],
    })
], DatabaseModule);
//# sourceMappingURL=index.js.map