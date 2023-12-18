"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistException extends common_1.BadRequestException {
    constructor(error) {
        super("That username or email is already taken", error);
    }
}
exports.UserAlreadyExistException = UserAlreadyExistException;
//# sourceMappingURL=user-already-exist.exception.js.map