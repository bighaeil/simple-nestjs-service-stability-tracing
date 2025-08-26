import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async create(@Req() req: any, @Body() dto: CreateOrderDto) {
        const traceId: string = req.traceId;

        const simulateTimeout = false;

        const result = await this.orderService.createOrder(
            traceId,
            dto.userId,
            dto.productId,
            dto.paymentMethod,
            simulateTimeout,
        );

        return { success: true, traceId, data: result };
    }

    /**
     * 타임아웃 시뮬레이션을 위한 주문 생성
     */
    @Post('/timeout')
    async createWithTimeout(@Req() req: any, @Body() dto: CreateOrderDto) {
        const traceId: string = req.traceId;

        const result = await this.orderService.createOrder(
            traceId,
            dto.userId,
            dto.productId,
            dto.paymentMethod,
            true, // 강제 타임아웃
        );

        return { success: true, traceId, data: result };
    }
}
