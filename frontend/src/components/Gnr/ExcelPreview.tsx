import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

interface Props {
  file: File;
}

export default function ExcelPreview({
  file,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<any[][]>([]);
  useEffect(() => {
    console.log(containerRef.current)
    if (!file)
      return;
    console.log("b");

    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target?.result;

      if (!data) return;

      const workbook = XLSX.read(data, {
        type: 'array',
      });

      const firstSheet =
        workbook.Sheets[
        workbook.SheetNames[0]
        ];

      const range = XLSX.utils.decode_range(
        firstSheet["!ref"] || "A1"
      );

      const excelRows: string[][] = [];

      for (
        let row = range.s.r;
        row <= range.e.r;
        row++
      ) {
        const currentRow: string[] = [];

        for (
          let col = range.s.c;
          col <= range.e.c;
          col++
        ) {
          const cellAddress =
            XLSX.utils.encode_cell({
              r: row,
              c: col,
            });
          const cell =
            firstSheet[cellAddress];
          currentRow.push(
            cell?.v?.toString() ?? ""
          );
        }
        excelRows.push(currentRow);
      }
      setRows(excelRows);
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <div className="overflow-auto rounded w-full">
      <table className="min-w-full border-collapse">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-green-400 px-2 py-1"
                >
                  {String(cell ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}