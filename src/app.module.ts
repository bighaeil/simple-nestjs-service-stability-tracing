import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraceIdMiddleware } from './common/middlewares/trace-id.middleware';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TracingInterceptor } from './common/interceptors/tracing.interceptor';
import { ExternalService } from './external.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [
        AppService,
        ExternalService,
        { provide: APP_FILTER, useClass: GlobalExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: TracingInterceptor },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TraceIdMiddleware, HttpLoggerMiddleware).forRoutes('*');
    }
}
