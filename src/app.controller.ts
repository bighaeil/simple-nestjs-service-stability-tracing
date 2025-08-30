import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/call')
    async callExternalService(): Promise<any> {
        return await this.appService.callExternalService();
    }

    @Get('/ack')
    async ack(): Promise<{ status: string }> {
        // 100ms 딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 100));
        return { status: 'ok' };
    }
}
