import { STATUS } from '@/types';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TFormatResponse {
  status: STATUS;
  data: any;
}

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TFormatResponse> {
    return next.handle().pipe(
      map(res => {
        return {
          status: STATUS.SUCCESS,
          data: res,
        };
      })
    );
  }
}
