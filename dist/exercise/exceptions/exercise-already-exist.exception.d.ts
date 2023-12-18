import { BadRequestException } from "@nestjs/common";
export declare class ExerciseAlreadyExistException extends BadRequestException {
    constructor(error?: string);
}
