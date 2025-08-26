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
│  ├─ common/
│  │  ├─ filters/global-exception.filter.ts
│  │  └─ middleware/
│  │     ├─ http-logger.middleware.ts
│  │     └─ trace-id.middleware.ts
│  ├─ orders/
│  │  ├─ orders.module.ts
│  │  ├─ orders.controller.ts
│  │  ├─ orders.service.ts
│  │  └─ dto/create-order.dto.ts
│  ├─ payment/
│  │  ├─ payment.module.ts
│  │  └─ payment.service.ts
│  └─ types/express.d.ts
└─ README.md  (선택)
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

## create order

```bash
curl -X POST http://localhost:3000/orders \
 -H "Content-Type: application/json" \
 -d '{"userId": 1, "productId": 101, "paymentMethod": "bank"}'
```

## create order timeout

```bash
curl -X POST http://localhost:3000/orders \
 -H "Content-Type: application/json" \
 -d '{"userId": 1, "productId": 101, "paymentMethod": "card"}'
```

```bash
curl -X POST http://localhost:3000/orders/timeout \
 -H "Content-Type: application/json" \
 -d '{"userId": 1, "productId": 101, "paymentMethod": "bank"}'
```

응답 JSON에는 `traceId`가 포함되어 있습니다. 이 ID는 요청의 추적을 위해 사용됩니다.

## 사용 팁
- 운영에서 **로그 수집기(ELK/CloudWatch/Datadog)**를 붙이면 `traceId`로 전체 요청 히스토리를 쉽게 찾아낼 수 있어요.
- 실제 PG 연동 시엔 `PaymentService`에서 외부 호출 헤더에 `X-Trace-Id`를 그대로 전달하세요.
- 민감 정보(토큰/비밀번호/카드번호)는 필히 마스킹하거나 기록 금지!

