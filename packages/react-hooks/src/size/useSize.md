---
title: useSize
nav:
  title: Hooks
  path: /hook
order: 2
---

# useSize

监听 dom 元素尺寸变化的 hook

<code src="./demo/useSize.tsx">

# API

```typescript
const size = useSize(dom);
```

# 返回值

| 参数 | 说明   | 类型                              |
| ---- | ------ | --------------------------------- |
| size | 尺寸值 | {width?: number, height?: number} |
