import { useLayoutEffect, useState } from 'react';
import type { BasicTarget } from '../utils/dom';
import { getTargetElement } from '../utils/dom';

type Size = {
  width?: number;
  height?: number;
};

export function useSize(target: BasicTarget) {
  const [size, setSize] = useState<Size>(() => {
    const el = (getTargetElement(target) || {}) as HTMLElement;
    return {
      width: el.clientWidth,
      height: el.clientHeight,
    };
  });

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });
    resizeObserver.observe(el);

    // eslint-disable-next-line consistent-return
    return () => resizeObserver.disconnect();
  }, [target]);

  return size;
}
