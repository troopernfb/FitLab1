import { BadRequestException } from "@nestjs/common";

export class ExerciseAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super("An exercise with that name already exists", error);
  }
}