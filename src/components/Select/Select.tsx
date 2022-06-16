import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React, { memo, useCallback, useEffect, useMemo } from 'react';

interface Item {
  id?: string;
  index: number;
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  items: Item[];
  selectedItem?: Item | Item[];
  selectedValue?: string | string[];
  onChangeValue: (value: Item | Item[]) => void;
  isMultiple?: boolean;
  style?: any;
  label?: string;
  disabled?: boolean;
}

//value: {item} | [{item}]
function CustomSelect({
  items,
  selectedItem,
  selectedValue,
  onChangeValue,
  isMultiple = false,
  style,
  label,
  disabled = false,
}: Props) {
  const [selectedIndexPath, setSelectedIndexPath] = React.useState<any>(
    isMultiple ? [] : new IndexPath(0)
  );

  const onSelect = useCallback(
    (indexPath: IndexPath | IndexPath[]) => {
      if (isMultiple) {
        // setSelectedIndexPath(indexPath);
        const selectedIndexes = new Set((indexPath as IndexPath[]).map((item) => item.row));
        onChangeValue(items.filter((item, idx) => selectedIndexes.has(idx)));
        return;
      }

      const value = items[(indexPath as IndexPath).row];
      // setSelectedIndexPath(indexPath);
      onChangeValue(value);
    },
    [items, onChangeValue, isMultiple]
  );

  let displayValue = '';
  const selectedItems: Item[] = useMemo(() => {
    if (selectedItem) {
      return isMultiple ? (selectedItem as Item[]) : [selectedItem as Item];
    } else if (selectedValue) {
      if (isMultiple) {
        //handle later;
        return [];
      }
      const foundItem = items.find((item) => item.value === selectedValue);
      return foundItem ? [foundItem] : [];
    }
    return [];
  }, [selectedItem, isMultiple, items, selectedValue]);

  // const selectedValues: string[] = useMemo(() => {
  //   if (selectedValue) {
  //     return isMultiple ? (selectedValue as string[]) : [selectedValue as string];
  //   }
  //   return [];
  // }, [selectedValue, isMultiple]);

  displayValue = selectedItems.length
    ? selectedItems.map((item) => item.label).join(', ') || ''
    : '';

  useEffect(() => {
    if (selectedItems.length) {
      if (isMultiple) {
        setSelectedIndexPath(selectedItems.map((item) => new IndexPath(item.index)));
      } else {
        setSelectedIndexPath(new IndexPath(selectedItems[0].index));
      }
    }

    // if (selectedValues.length) {
    //   if (isMultiple) {
    //     //not handle now
    //   } else {
    //     const item = items.find((item) => item.value === selectedValues[0]);
    //     setSelectedIndexPath(new IndexPath(item!.index));
    //   }
    // }
  }, [selectedItems, isMultiple, items]);

  return (
    <Select
      label={label}
      selectedIndex={selectedIndexPath}
      onSelect={onSelect}
      style={style}
      value={displayValue}
      multiSelect={isMultiple}
      placeholder="select option"
      disabled={disabled}
    >
      {items.map((item) => (
        <SelectItem title={item.label} key={item.value} disabled={item.disabled} />
      ))}
    </Select>
  );
}

export default memo(CustomSelect);
