import { AbstractEntity } from '../../common/entities/abstract.entity';
import { AuthenticationEntity } from '../../auth/entities/auth.entity';
export declare class UserEntity extends AbstractEntity {
    username: string;
    authentication: AuthenticationEntity;
    isActive: boolean;
}
