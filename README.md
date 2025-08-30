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

# 동시 요청(curl) 예시

아래는 5개의 동시 요��을 curl로 보내고, 각 응답에서 x-trace-id 헤더만 추출하는 예시입니다. (bash에서 실행)

```bash
for i in {1..5}; do
  curl -s -i http://localhost:3000/ack | grep -i x-trace-id &
done
wait
```

- 각 요청의 응답 헤더에서 x-trace-id 값을 확인할 수 있습니다.
- 서버가 실행 중이어야 하며, 포트(3000)는 환경에 맞게 수정하세요.
