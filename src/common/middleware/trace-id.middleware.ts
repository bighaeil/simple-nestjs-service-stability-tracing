import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const incoming = req.headers['x-trace-id'] || req.headers['trace-id'];
        const traceId =
            (Array.isArray(incoming) ? incoming[0] : incoming) || uuidv4();

        req.traceId = traceId;
        res.setHeader('X-Trace-Id', traceId);

        next();
    }
}
