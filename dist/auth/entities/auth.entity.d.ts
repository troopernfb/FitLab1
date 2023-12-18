import { AbstractEntity } from "../../common/entities/abstract.entity";
import { UserEntity } from "../../user/entities/user.entity";
export declare class AuthenticationEntity extends AbstractEntity {
    email: string;
    password: string;
    refreshToken: string;
    user: UserEntity;
    formatEmail(): Promise<void>;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    validateRefreshToken(refreshToken: string): Promise<boolean>;
}
