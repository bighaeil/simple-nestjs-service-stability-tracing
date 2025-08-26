import { Module } from '@nestjs/common';
import { PaymentModule } from '../payment/payment.module';
import { OrderService } from './orders.service';
import { OrderController } from './order.controller';

@Module({
    imports: [PaymentModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
