import React, { useState } from 'react';
import Image from 'next/image';
import CreateButton from './create-button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import Filter from './filter';
import ExcelExport from './excel-export';

interface PaginatedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title: string;
  ButtonGroup?: React.FC<{ row: Row<unknown> }>;
  createLink?: string;
  createLabel?: string;
}

function PaginatedTable<T>({
  data,
  columns,
  title,
  ButtonGroup,
  createLink = '',
  createLabel = '',
}: PaginatedTableProps<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="p-2 border-2 text-gray-500 font-light text-sm border-gray-200 rounded mx-8 lg:mx-32 bg-white">
      <div className="px-4 py-8 border-b-2 border-gray-200 mb-8 flex justify-between items-center">
        <p className="text-gray-800 text-xl">{title}</p>
        <div className="flex justify-center items-center gap-4">
          <ExcelExport fileName={title} data={data} />
          {createLabel && <CreateButton label={createLabel} href={createLink} />}
        </div>
      </div>
      <div className="h-2" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 mx-auto relative">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted()
                        ? { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as 'asc' | 'desc']
                        : null}
                      {header.column.getCanFilter() ? (
                        <div className="mb-4">
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </button>
                  </th>
                ))}
                <th className="px-6 py-3"> </th>
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Image src="/error.png" width={200} height={200} alt="Error" />
                    <p className="text-lg mt-2">No Records</p>
                  </div>
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${Number(row.id) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-6 py-2 space-x-2">{ButtonGroup && <ButtonGroup row={row} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-1">
          <div>Sayfa</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <div className="flex gap-x-2">
          <button
            aria-label="First Page"
            className="border border-gray-200 rounded-full p-2"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </button>
          <button
            aria-label="Previous Page"
            className="border border-gray-200 rounded-full p-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next Page"
            className="border border-gray-200 rounded-full p-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
          <button
            aria-label="Last Page"
            className="border border-gray-200 rounded-full p-2"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border border-gray-200 rounded p-2"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Göster {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        Toplam {table.getRowCount().toLocaleString()} kayıttan{' '}
        {table.getRowModel().rows.length.toLocaleString()} tanesi gösteriliyor
      </div>
    </div>
  );
}

export default PaginatedTable;
