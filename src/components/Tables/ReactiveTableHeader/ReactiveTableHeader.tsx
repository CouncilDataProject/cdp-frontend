import React from "react";
import useMediaQuery from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";

type ReactiveTableHeaderProps = {
  /** column names */
  columnNames?: string[];
  /** column distribution, should sum to 100%.  0 width columns or columns with no assigned width will not appear */
  columnDistribution: string[];
};

const ReactiveTableHeader = ({ columnNames, columnDistribution }: ReactiveTableHeaderProps) => {
  const isMobile = new useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  if (isMobile) {
    return null;
  } else {
    return (
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        {columnNames?.map((columnName, index) => {
          const width = columnDistribution[index] || 0;
          return (
            <div key={columnName} style={{ width }}>
              <h6>{columnName}</h6>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ReactiveTableHeader;
