/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, ms: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ms < 0) {
      return;
    }
    const timeoutId = setTimeout(callbackRef.current, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms]);
}

export function useInterval(callback: () => void, ms: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ms < 0) {
      return;
    }
    const timeoutId = setInterval(callbackRef.current, ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms]);
}
