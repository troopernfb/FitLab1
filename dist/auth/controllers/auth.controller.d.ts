import { AuthenticationService } from '../services/auth.service';
import { RegistrationDto } from '../dtos';
import { ITokens } from '../interfaces/ITokens';
import { IJwtPayload } from '../interfaces/IJwtPayload';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    register(registrationDto: RegistrationDto): Promise<ITokens>;
    login(req: any): Promise<ITokens>;
    logout(userId: string): Promise<boolean>;
    refresh(user: IJwtPayload): Promise<ITokens>;
}
