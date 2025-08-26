# NestJS Stable Server (Exceptions + Logging + Trace ID)

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


