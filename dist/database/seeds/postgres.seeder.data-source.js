"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const strategies_1 = require("../strategies");
const constants_1 = require("../../app/constants");
config_1.ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.development.local', '.env']
});
const dataSourceOptionsFactory = (configService) => ({
    type: "postgres",
    host: configService.get("POSTGRES_HOST"),
    port: configService.get("POSTGRES_PORT"),
    username: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
    seeds: ["src/database/seeds/**/*.seeder{.ts,.js}"],
    entities: ["src/../**/*.entity{.ts,.js}"],
    namingStrategy: new strategies_1.SnakeNamingStrategy(),
    logging: configService.get("NODE_ENV") === constants_1.NODE_ENV.DEVELOPMENT,
    extra: { charset: "utf8mb4_unicode_ci" },
});
exports.default = new typeorm_1.DataSource(dataSourceOptionsFactory(new config_1.ConfigService()));
//# sourceMappingURL=postgres.seeder.data-source.js.map