import type { MutableRefObject } from 'react';

type TargetElement = HTMLElement | Element | Document | Window;

export type BasicTarget<T = HTMLElement> =
  | T
  | null
  | (() => T | null)
  | MutableRefObject<T | null | undefined>;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultTarget?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultTarget;
  }

  let targetElement: TargetElement | undefined | null;
  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
