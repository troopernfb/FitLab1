import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const GetUser = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
)