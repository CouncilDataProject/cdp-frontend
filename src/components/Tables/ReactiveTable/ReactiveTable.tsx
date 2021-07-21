import React from "react";
import { ReactiveTableHeader } from "../ReactiveTableHeader";
import { EmptyRow } from "../EmptyRow";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type RowRenderFunction = (rowData: any, index: number) => JSX.Element;

type ReactiveTableProps = {
  /** an array of data to be rendered by the renderRow function */
  data: object[];
  /** renders the row. */
  renderRow: RowRenderFunction;
  /** provides a JSX Element on top of the table */
  caption?: JSX.Element;
  /** each column should have a name */
  columnNames?: string[];
  /** distributes the columns widths */
  columnDistribution: string[];
};

function renderEmpty(index: number) {
  return <EmptyRow key={`empty-table-row-${index}`} index={index} />;
}

const ReactiveTable = ({
  data,
  renderRow,
  columnDistribution,
  columnNames,
  caption,
}: ReactiveTableProps) => {
  const isEmpty = !data || !data.length || data.length === 0;

  return (
    <React.Fragment>
      {caption}
      <ReactiveTableHeader columnDistribution={columnDistribution} columnNames={columnNames} />
      {isEmpty && renderEmpty(0)}
      {data.map((rowData: any, index: number) => {
        return renderRow(rowData, index);
      })}
    </React.Fragment>
  );
};

export default ReactiveTable;
