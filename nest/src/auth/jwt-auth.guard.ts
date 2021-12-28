import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {RequestService} from "../request/request.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private requestService: RequestService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      req.user = this.requestService.user();
      return true;
    } catch (e) {
      throw new UnauthorizedException({message: "User is not authorized"});
    }
  }
}