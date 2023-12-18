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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const base_exercise_entity_1 = require("../entity/base-exercise.entity");
const constraints_1 = require("../../database/constraints");
const exceptions_1 = require("../../auth/exceptions");
let ExerciseService = class ExerciseService {
    constructor(baseExerciseRepository) {
        this.baseExerciseRepository = baseExerciseRepository;
    }
    async createBaseExercise(createBaseExerciseDto) {
        try {
            const baseExercise = this.baseExerciseRepository.create(createBaseExerciseDto);
            return this.baseExerciseRepository.save(baseExercise);
        }
        catch (error) {
            if (error?.code === constraints_1.PostgresErrorCode.UniqueViolation) {
                throw new exceptions_1.UserAlreadyExistException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAllBaseExercises() {
        return await this.baseExerciseRepository.find();
    }
};
exports.ExerciseService = ExerciseService;
exports.ExerciseService = ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(base_exercise_entity_1.BaseExerciseEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ExerciseService);
//# sourceMappingURL=exercise.service.js.map