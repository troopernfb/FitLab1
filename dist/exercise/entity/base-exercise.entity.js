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
exports.BaseExerciseEntity = void 0;
const common_1 = require("../../common");
const typeorm_1 = require("typeorm");
const unit_of_measurement_enum_1 = require("../enum/unit-of-measurement.enum");
let BaseExerciseEntity = class BaseExerciseEntity extends common_1.AbstractEntity {
};
exports.BaseExerciseEntity = BaseExerciseEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], BaseExerciseEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
    }),
    __metadata("design:type", String)
], BaseExerciseEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: unit_of_measurement_enum_1.UnitOfMeasurement,
    }),
    __metadata("design:type", String)
], BaseExerciseEntity.prototype, "unitOfMeasurement", void 0);
exports.BaseExerciseEntity = BaseExerciseEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "base_exercise" })
], BaseExerciseEntity);
//# sourceMappingURL=base-exercise.entity.js.map