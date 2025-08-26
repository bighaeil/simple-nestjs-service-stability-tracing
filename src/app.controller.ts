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
        return await Promise.resolve({ status: 'ok' });
    }
}
