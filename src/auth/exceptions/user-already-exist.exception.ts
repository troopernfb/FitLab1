import { BadRequestException } from "@nestjs/common";

export class UserAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super("That username or email is already taken", error);
  }
}