import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { asyncLocalStorage } from './common/interceptors/tracing.interceptor';

@Injectable()
export class ExternalService {
    constructor(private readonly httpService: HttpService) {
        this.httpService.axiosRef.interceptors.request.use((config) => {
            const store = asyncLocalStorage.getStore() as { traceId: string };
            if (store && store.traceId) {
                config.headers['x-trace-id'] = store.traceId;
            }
            return config;
        });
    }
}
