import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { finalize, Observable } from 'rxjs';

export const asyncLocalStorage = new AsyncLocalStorage();

@Injectable()
export class TracingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const traceId = request.headers['x-trace-id'] || 'no-trace-id';

        // AsyncLocalStorage에 traceId 저장
        return asyncLocalStorage.run({ traceId }, () => {
            return next.handle().pipe(
                finalize(() => {
                    // 요청이 끝나면 컨텍스트 제거
                    asyncLocalStorage.disable();
                }),
            );
        });
    }
}
