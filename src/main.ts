import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    app.getHttpAdapter().get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    await app.listen(process.env.PORT ?? 3000);

    new Logger('Bootstrap').log(
        `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
}
bootstrap();
