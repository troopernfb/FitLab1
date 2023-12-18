"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseAlreadyExistException = void 0;
const common_1 = require("@nestjs/common");
class ExerciseAlreadyExistException extends common_1.BadRequestException {
    constructor(error) {
        super("An exercise with that name already exists", error);
    }
}
exports.ExerciseAlreadyExistException = ExerciseAlreadyExistException;
//# sourceMappingURL=exercise-already-exist.exception.js.map