import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger();

    use(req: any, res: any, next: (error?: any) => void) {
        const { method, originalUrl } = req;
        const traceId = req.traceId;
        const start = Date.now();

        this.logger.log(`[${traceId}] ${method} ${originalUrl} START`);

        res.on('finish', () => {
            const duration = Date.now() - start;
            this.logger.log(
                `[${traceId}] ${method} ${originalUrl} ${res.statusCode} - ${duration}ms END`,
            );
        });

        next();
    }
}
