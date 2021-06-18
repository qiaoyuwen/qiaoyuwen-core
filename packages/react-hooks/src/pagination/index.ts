import { useMemo } from 'react';
import { useSWRInfinite } from 'swr';

export function useInfinitePagination<T>(
  key: string,
  fetcher: (current: number, pageSize: number, params?: Record<string, any>) => Promise<T[]>,
  pageSize: number,
  params?: Record<string, any>,
) {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<T[]>(
    (current) => [key, current + 1, pageSize, params],
    (_, current, _pageSize, _params) => fetcher(current, _pageSize, _params),
  );

  const returnObj = useMemo(() => {
    const isLoadingInitialData = !data && !error;
    const isLoading =
      isLoadingInitialData || !!(size > 0 && data && typeof data[size - 1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isRefreshing = isValidating && !!(data && data.length === size);
    const isReachingEnd = isEmpty || !!(data && data[data.length - 1].length < pageSize);

    const loadMore = () => {
      if (!isLoading && !isReachingEnd) {
        setSize(size + 1);
      }
    };

    const reset = () => {
      setSize(1);
    };

    return {
      refresh: mutate,
      loadMore,
      reset,
      isLoading,
      isEmpty,
      isReachingEnd,
      isRefreshing,
    };
  }, [data, error, size, pageSize, isValidating, mutate, setSize]);

  return [
    data ? ([] as T[]).concat(...data) : [],
    {
      ...returnObj,
    },
  ] as const;
}
