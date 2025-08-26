import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    /**
     * 결제 시뮬레이션
     * - 정상 흐름: 300~800ms 랜덤 지연 후 승인
     * - 타임아웃 시뮬: 5초 이상 지연을 유도하여 504 반환
     */
    async pay(traceId: string, amount: number, simulateTimeout = false) {
        if (simulateTimeout) {
            this.logger.warn(`[${traceId}] Simulating PG timeout...`);
            await this.sleep(6000);
            throw new HttpException(
                'Payment service timeout',
                HttpStatus.GATEWAY_TIMEOUT,
            );
        }

        const delay = 300 + Math.floor(Math.random() * 500);
        await this.sleep(delay);

        const approvalCode = `APV-${Date.now()}`;
        this.logger.log(
            JSON.stringify({ traceId, approvalCode, amount, delayMs: delay }),
        );

        return { approvalCode, amount };
    }

    private sleep(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
}
