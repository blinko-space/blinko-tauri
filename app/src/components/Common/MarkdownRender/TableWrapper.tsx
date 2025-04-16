import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/react";
import { Pagination } from "@heroui/react";

export const TableWrapper = ({ children }: { children?: React.ReactNode }) => {
    //@ts-ignore
  const parseTableData = () => {
    if (!children) {
      return { headers: [], rows: [] };
    }

    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length < 2) {
      return { headers: [], rows: [] };
    }

    const [thead, tbody] = childrenArray;
    //@ts-ignore
    const headers = thead?.props?.children?.props?.children
      //@ts-ignore
      ? React.Children.toArray(thead.props.children.props.children).map(
        (th: any) => th.props?.children || ''
      )
      : [];
    //@ts-ignore
    const rows = tbody?.props?.children
      //@ts-ignore
      ? React.Children.toArray(tbody.props.children).map((tr: any) =>
        React.Children.toArray(tr.props?.children || []).map(
          (td: any) => td.props?.children || ''
        )
      )
      : [];

    return { headers, rows };
  };

  const { headers, rows } = parseTableData();

  if (headers.length === 0 || rows.length === 0) {
    return (
      <div className="w-full my-4">
        <Table aria-label="Empty table">
          <TableHeader>
            <TableColumn>No Data</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>No data available</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(rows.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentRows = rows.slice(start, end);

  return (
    <div className="w-full">
      <Table
        className="my-4 overflow-y-scroll w-full"
        isStriped
      // removeWrapper
      >
        <TableHeader>
          {headers.map((header, index) => (
            <TableColumn key={`header-${index}`}>{header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {currentRows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pages > 1 && (
        <div className="flex justify-center my-4">
          <Pagination
            total={pages}
            page={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}; 