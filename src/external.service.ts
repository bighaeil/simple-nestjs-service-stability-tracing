import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { asyncLocalStorage } from './common/interceptors/tracing.interceptor';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ExternalService {
    private readonly logger = new Logger(ExternalService.name);

    constructor(private readonly httpService: HttpService) {
        this.httpService.axiosRef.interceptors.request.use((config) => {
            const store = asyncLocalStorage.getStore() as { traceId: string };
            if (store && store.traceId) {
                config.headers['x-trace-id'] = store.traceId;
            }
            return config;
        });
    }

    async fetchData(): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get(`http://localhost:3002/ack`).pipe(
                catchError((err: AxiosError) => {
                    if (err.response) {
                        this.logger.error(err.response.data);
                    } else if (err.request) {
                        this.logger.error(err.message);
                    } else {
                        this.logger.error('Error', err.message);
                    }
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }
}
