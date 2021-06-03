---
title: useBoolean
nav:
  title: Hooks
  path: /hook
order: 2
---

# useBoolean

`useBoolean` returns a `[value, methods]` tuple, in which methods are listed as:

```typescript
interface BooleanMethods {
  // Change value to true
  on(): void;
  // Change value to false
  off(): void;
  // Toggle current value
  toggle(): void;
}
```
