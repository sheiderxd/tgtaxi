import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dtoClass: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dtoClass, data, {
          strategy: "excludeAll",
        });
      })
    );
  }
}
