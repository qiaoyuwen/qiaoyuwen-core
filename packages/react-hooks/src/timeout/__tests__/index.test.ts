import { renderHook } from '@testing-library/react-hooks';
import { useTimeout, useInterval } from '../index';

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe('useTimeout', () => {
  test('executes after timeout', async () => {
    const fn = jest.fn();
    renderHook(() => useTimeout(fn, 10));
    await timeout(11);
    expect(fn).toHaveBeenCalled();
  });

  test('not executes if time is negative', async () => {
    const fn = jest.fn();
    renderHook(() => useTimeout(fn, -1));
    await timeout(5);
    expect(fn).not.toHaveBeenCalled();
  });

  test('stop on unmount', async () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useTimeout(fn, 10));
    unmount();
    await timeout(11);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('useInterval', () => {
  test('executes every timeout', async () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, 10));
    await timeout(25);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('not executes if time is negative', async () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, -1));
    await timeout(5);
    expect(fn).not.toHaveBeenCalled();
  });

  test('stop on unmount', async () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useInterval(fn, 10));
    unmount();
    await timeout(11);
    expect(fn).not.toHaveBeenCalled();
  });
});
