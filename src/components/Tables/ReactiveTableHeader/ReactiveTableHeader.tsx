import React from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { fontSizes } from "../../../styles/fonts";

const TableHeader = styled.div({
  padding: 8,
  fontSize: fontSizes.font_size_6,
  fontWeight: 600,
});

type ReactiveTableHeaderProps = {
  /** column names */
  columnNames?: string[];
  /** column distribution, should sum to 100%.  0 width columns or columns with no assigned width will not appear */
  columnDistribution: string[];
};

const ReactiveTableHeader = ({ columnNames, columnDistribution }: ReactiveTableHeaderProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  if (isMobile) {
    return null;
  } else {
    return (
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        {columnNames?.map((columnName, index) => {
          const width = columnDistribution[index] || 0;
          return (
            <div key={columnName} style={{ width }}>
              <TableHeader>{columnName}</TableHeader>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ReactiveTableHeader;
