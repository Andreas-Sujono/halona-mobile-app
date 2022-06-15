import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React, { memo, useCallback, useMemo } from 'react';

interface Item {
  id?: string;
  label: string;
  value: string;
}

interface Props {
  items: Item[];
  selectedValue: string;
  onChangeValue: (value: string) => void;
  isMultiple?: boolean;
  style?: any;
  label?: string;
}

function CustomSelect({
  items,
  selectedValue,
  onChangeValue,
  isMultiple = false,
  style,
  label,
}: Props) {
  const [selectedIndexPath, setSelectedIndexPath] = React.useState<any>(new IndexPath(0));

  const onSelect = useCallback(
    (indexPath: IndexPath | IndexPath[]) => {
      const value = items[(indexPath as IndexPath).row];
      setSelectedIndexPath(indexPath);
      onChangeValue(value.value);
    },
    [items, onChangeValue]
  );

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === selectedValue);
  }, [selectedValue, items]);

  return (
    <Select
      label={label}
      selectedIndex={selectedIndexPath}
      onSelect={onSelect}
      style={style}
      value={selectedItem?.label}
    >
      {items.map((item) => (
        <SelectItem title={item.label} key={item.value} />
      ))}
    </Select>
  );
}

export default memo(CustomSelect);
