import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        const traceId = req?.traceId;

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse();
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error(
            JSON.stringify({
                traceId,
                method: req?.method,
                path: req?.url,
                statusCode: status,
                message,
            }),
        );

        res.status(status).json({
            traceId,
            timestamp: new Date().toISOString(),
            path: req?.url,
            statusCode: status,
            message,
        });
    }
}
