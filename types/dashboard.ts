import React from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';

export interface BreadcrumbItemProps {
  text: string;
  href: string;
}

export interface ButtonGroupProps<T> {
  row: Row<T>;
}

export interface ButtonProps {
  href: string;
  label: string;
}

export interface ExcelProps {
  data: unknown[];
  fileName: string;
}

export interface PaginatedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  ButtonGroup?: React.FC<ButtonGroupProps<T>>;
  title: string;
  createLink?: string;
  createLabel?: string;
}
