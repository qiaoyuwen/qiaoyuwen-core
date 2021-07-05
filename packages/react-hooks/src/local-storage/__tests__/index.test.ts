import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../index';
import { JSDOM } from 'jsdom';

/**
 * @jest-environment jsdom
 */

describe('useLocalStorage', () => {
  beforeAll(() => {
    const { window } = new JSDOM('', {
      url: 'http://localhost:8000',
    });
    global.window = window as any;
  });

  test('initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const [value] = result.current;
    expect(value).toBe('testValue');
  });

  test('existing value', () => {
    window.localStorage.setItem('testKey', JSON.stringify('originTestValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const [value] = result.current;
    expect(value).toBe('originTestValue');
  });

  test('inital value on parse error', () => {
    window.localStorage.setItem('testKey', 'invalid json');
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    expect(result.current[0]).toBe('testValue');
  });

  test('listen on change', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'testKey',
      oldValue: '"testValue"',
      newValue: '"newTestValue"',
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('newTestValue');
  });
});
