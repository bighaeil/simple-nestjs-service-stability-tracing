import { Injectable } from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
    constructor(private readonly payment: PaymentService) {}

    /**
     * 주문 생성 시뮬레이션
     * - 정상 흐름: 결제 승인 후 주문 생성
     * - 타임아웃 시뮬레이션: paymentMethod 가 'card' 인 경우
     */
    async createOrder(
        traceId: string,
        userId: number,
        productId: number,
        paymentMethod: 'card' | 'bank' | 'point',
        simulateTimeout = false,
    ) {
        const amount = this.calculateAmount(productId);

        const paymentResult = await this.payment.pay(
            traceId,
            amount,
            simulateTimeout ||
                paymentMethod === 'card' /* 예: 카드만 타임아웃 테스트 */,
        );

        return {
            orderId: `ORD-${Date.now()}`,
            userId,
            productId,
            paymentMethod,
            payment: paymentResult,
        };
    }

    private calculateAmount(productId: number) {
        return productId * 1000;
    }
}
