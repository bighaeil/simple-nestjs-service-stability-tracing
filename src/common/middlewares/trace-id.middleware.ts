import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { asyncLocalStorage } from '../interceptors/tracing.interceptor';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const incoming = req.headers['x-trace-id'] || req.headers['trace-id'];
        const traceId =
            (Array.isArray(incoming) ? incoming[0] : incoming) || uuidv4();

        req.traceId = traceId;
        req.headers['x-trace-id'] = traceId;
        res.setHeader('x-trace-id', traceId);

        // AsyncLocalStorage에 traceId 저장
        asyncLocalStorage.run({ traceId }, () => {
            next();
        });
    }
}
