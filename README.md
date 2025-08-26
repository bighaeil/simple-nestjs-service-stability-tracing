# NestJS Stable Server (Tracing)

# 폴더 구조

```
nestjs-stable-server/
├─ package.json
├─ tsconfig.json
├─ tsconfig.build.json
├─ nest-cli.json
├─ src/
│  ├─ main.ts
│  ├─ app.module.ts
│  ├─ app.controller.ts
│  ├─ app.service.ts
│  ├─ external.service.ts
│  └─ common/
│     ├─ filters/global-exception.filter.ts
│     ├─ interceptors/
│     │  └─ tracing.interceptor.ts
│     └─ middlewares/
│        ├─ http-logger.middleware.ts
│        └─ trace-id.middleware.ts
└─ README.md
```

## Install

```bash
npm install
``` 

## run

```bash
npm run start
```

## health

```bash
curl http://localhost:3000/health
```

# tracing

start Server A

```bash
PORT=3001 npm run start
 ```

call test

```bash
curl http://localhost:3001/call
```

A call was requested, but an error occurred in Server B.
because Server B is not running.

start Server B

```bash
PORT=3002 npm run start
```

ack test

```bash
curl http://localhost:3002/ack
```

A call was requested, and Server B responded normally.
Server A and Server B logs contain the same traceId.

## call Server A to Server B

```bash
curl http://localhost:3001/call
```
