import { IsEnum, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    @Min(1)
    userId!: number;

    @IsInt()
    @Min(1)
    productId!: number;

    @IsEnum(['card', 'bank', 'point'], {
        message: 'Payment method must be one of: card, bank, point',
    })
    paymentMethod!: 'card' | 'bank' | 'point';
}
