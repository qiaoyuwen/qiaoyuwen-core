import { useMemo, useState } from 'react';

export function useSelection<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set<T>(selected), [selected]);

  const singleActions = useMemo(() => {
    const isSelected = (item: T) => {
      return selectedSet.has(item);
    };

    const select = (item: T) => {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    };

    const unSelect = (item: T) => {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    };

    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return {
      isSelected,
      select,
      unSelect,
      toggle,
    };
  }, [selectedSet]);

  const allActions = useMemo(() => {
    const selectAll = () => {
      items.forEach((item) => {
        selectedSet.add(item);
      });
      return setSelected(Array.from(selectedSet));
    };

    const unSelectAll = () => {
      items.forEach((item) => {
        selectedSet.delete(item);
      });
      return setSelected(Array.from(selectedSet));
    };

    const noneSelected = items.every((item) => !selectedSet.has(item));

    const allSelected = items.every((item) => selectedSet.has(item)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => {
      if (allSelected) {
        unSelectAll();
      } else {
        selectAll();
      }
    };

    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll,
    };
  }, [selectedSet, items]);

  return [
    selected,
    {
      ...singleActions,
    },
    {
      ...allActions,
    },
    setSelected,
  ] as const;
}
