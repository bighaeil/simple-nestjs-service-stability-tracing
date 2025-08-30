import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AsyncLocalStorage Trace ID Isolation', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return different x-trace-id headers for 5 requests', async () => {
        const traceIds = new Set<string>();
        const agent = request.agent(app.getHttpServer());

        // 5개의 요청을 딜레이 없이 동시에 보냄
        const requests = Array.from({ length: 5 }).map(() => agent.get('/ack'));
        const responses = await Promise.all(requests);

        for (const res of responses) {
            expect(res.status).toBe(200);
            const traceId = res.header['x-trace-id'];
            expect(traceId).toBeDefined();
            traceIds.add(traceId);
        }
        expect(traceIds.size).toBe(5); // All should be unique
    });

    it('should echo x-trace-id header in response if provided', async () => {
        const customTraceId = 'my-custom-trace-id-123';
        const res = await request(app.getHttpServer())
            .get('/ack')
            .set('x-trace-id', customTraceId);

        expect(res.status).toBe(200);
        expect(res.header['x-trace-id']).toBe(customTraceId);
    });
});
