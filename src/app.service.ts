import { Injectable } from '@nestjs/common';
import { ExternalService } from './external.service';

@Injectable()
export class AppService {
    constructor(private readonly externalService: ExternalService) {}

    getHello(): string {
        return 'Hello World!';
    }

    async callExternalService(): Promise<any> {
        return await this.externalService.fetchData();
    }
}
