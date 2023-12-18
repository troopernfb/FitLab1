import { Strategy } from "passport-local";
import { AuthenticationService } from "../services/auth.service";
import { UserEntity } from "../../user/entities";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthenticationService);
    validate(email: string, password: string): Promise<UserEntity>;
}
export {};
