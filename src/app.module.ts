import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraceIdMiddleware } from './common/middleware/trace-id.middleware';
import { HttpLoggerMiddleware } from './common/middleware/http-logger.middleware';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
    imports: [OrderModule, PaymentModule],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TraceIdMiddleware, HttpLoggerMiddleware).forRoutes('*');
    }
}
