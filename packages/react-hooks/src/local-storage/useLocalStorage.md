---
title: useLocalStorage
nav:
  title: Storage
  path: /hook
order: 2
---

# useLocalStorage

管理 localStorage 的 hook

<code src="./demo/useLocalStorage.tsx">

# API

```typescript
const [
  state,
  setState,
] = useLocalStorage<T>(
  key: string,
  initialValue: T,
);
```

# 返回值

| 参数     | 说明                              | 类型               |
| -------- | --------------------------------- | ------------------ |
| state    | 状态值                            | boolean            |
| setState | 设置新状态值并同步到 localStorage | (value: T) => void |
