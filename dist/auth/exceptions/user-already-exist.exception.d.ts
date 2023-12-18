import { BadRequestException } from "@nestjs/common";
export declare class UserAlreadyExistException extends BadRequestException {
    constructor(error?: string);
}
