---
title: useInterval
nav:
  title: Timeout
  path: /hook
order: 1
---

# useInterval

setInterval 的 hook 版本

<code src="./demo/useInterval.tsx">

# API

```typescript
useInterval(callback: () => void, ms: number);
```

# 参数

| 参数名   | 说明     | 类型       |
| -------- | -------- | ---------- |
| callback | 回调方法 | () => void |
| ms       | 间隔时间 | number     |
