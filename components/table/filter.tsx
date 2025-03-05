import React from 'react';
import { Column, Table } from '@tanstack/react-table';

interface FilterProps<TData> {
  column: Column<TData, unknown>;
  table: Table<TData>;
}

const Filter = <TData,>({ column, table }: FilterProps<TData>) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex justify-center items-center gap-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
        }
        placeholder="Min"
        className="p-2 mt-2 w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
        }
        placeholder="Max"
        className="p-2 mt-2 w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="p-2 mt-2 w-36 border shadow rounded"
    />
  );
};

export default Filter;
