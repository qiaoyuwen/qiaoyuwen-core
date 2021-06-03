import { renderHook, act } from '@testing-library/react-hooks';
import { useSet } from '../index';

describe('useSet', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useSet());
    const [value, methods] = result.current;
    expect(value).toStrictEqual(new Set());
    Object.keys(methods).forEach((key) => {
      expect(typeof methods[key]).toBe('function');
    });
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useSet([1]));
    const [value] = result.current;
    expect(value).toStrictEqual(new Set([1]));
  });

  test('add', () => {
    const { result } = renderHook(() => useSet([1]));
    act(() => result.current[1].add(2));
    expect(result.current[0]).toStrictEqual(new Set([1, 2]));

    act(() => result.current[1].add(2));
    expect(result.current[0]).toStrictEqual(new Set([1, 2]));
  });

  test('addAll', () => {
    const { result } = renderHook(() => useSet([1]));
    act(() => result.current[1].addAll([2, 3]));
    expect(result.current[0]).toStrictEqual(new Set([1, 2, 3]));
  });

  test('delete', () => {
    const { result } = renderHook(() => useSet([1, 2]));
    act(() => result.current[1].delete(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));

    act(() => result.current[1].delete(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));
  });

  test('deleteAll', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    act(() => result.current[1].deleteAll([2, 3]));
    expect(result.current[0]).toStrictEqual(new Set([1]));
  });

  test('clear', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    act(() => result.current[1].clear());
    expect(result.current[0]).toStrictEqual(new Set());
  });
});
