import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

import { ExcelProps } from '@/types/dashboard';

const ExcelExport: React.FC<ExcelProps> = ({ data, fileName }: ExcelProps) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button
      className="rounded-lg p-2 border border-gray-500 font-semibold w-24"
      onClick={exportToExcel}
    >
      <Download className="inline-block mr-2 font-bold w-4 h-4" /> Export
    </button>
  );
};

export default ExcelExport;
