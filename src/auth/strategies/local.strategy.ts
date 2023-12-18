import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../services/auth.service";
import { UserEntity } from "../../user/entities";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    return await this.authService.validateUser(email, password);
  }
}