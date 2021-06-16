/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';

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

export function useCountdown(initialCountdownMs: number = 60 * 1000, stepMs: number = 1 * 1000) {
  const [countdown, setCountdown] = useState(initialCountdownMs);
  const countdownRef = useRef(initialCountdownMs);
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const removeTimeout = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);

  const start = useCallback(() => {
    removeTimeout();
    if (stepMs < 0) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      timeoutIdRef.current = setInterval(() => {
        if (countdownRef.current <= 0) {
          removeTimeout();
          resolve();
          return;
        }
        countdownRef.current -= stepMs;
        setCountdown(countdownRef.current);
      }, stepMs);
    });
  }, [removeTimeout, stepMs]);

  return [countdown, start] as const;
}
