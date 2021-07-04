import React from "react";
import { useMediaQuery } from "react-responsive";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type ReactiveTableHeaderProps = {
  /** column names */
  columnNames?: string[];
  /** column distribution, should sum to 100%.  0 width columns or columns with no assigned width will not appear */
  columnDistribution: string[];
};

const ReactiveTableHeader = ({ columnNames, columnDistribution }: ReactiveTableHeaderProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  if (isMobile) {
    return null;
  } else {
    return (
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        {columnNames?.map((columnName, index) => {
          const width = columnDistribution[index] || 0;
          return (
            <div style={{ width }}>
              <h6>{columnName}</h6>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ReactiveTableHeader;
