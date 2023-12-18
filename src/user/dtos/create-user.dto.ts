import { IsNotEmpty, IsString } from "class-validator";
import { CreateAuthenticationDto } from "../../auth/dtos/create-auth.dto";

export class CreateUserDto extends CreateAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}