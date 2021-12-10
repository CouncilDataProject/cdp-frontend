import React from "react";
import { EmptyRow } from "../EmptyRow";
import useMediaQuery from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { STYLES } from "../../../constants/StyleConstants";

type ReactiveTableRowProps = {
  /** the index of the row */
  index: number;
  /** each child provided to this element will be a column. **/
  children?: JSX.Element[];
  /** the column names.  on small screens, the table headers will disappear and column names will be included in the rows */
  columnNames?: string[];
  /** column distribution, should sum to 100%.  0 width columns or columns with no assigned width will not appear */
  columnDistribution: string[];
  /**  */
  onClick?: React.MouseEventHandler;
};

const ReactiveTableRow = ({
  index,
  children,
  columnNames,
  columnDistribution,
  onClick,
}: ReactiveTableRowProps) => {
  const backgroundColor = index % 2 === 0 ? STYLES.COLORS.EVEN_CELL : STYLES.COLORS.ODD_CELL;

  if (!children || children.length === 0) {
    return <EmptyRow index={index} />;
  }
  const isMobile = new useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 16,
          borderBottom: "1px solid #000000",
          backgroundColor,
        }}
      >
        {children?.map((childElement, index) => {
          const columnName = columnNames ? columnNames[index] : "";
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <p
                style={{ flex: 1, fontWeight: "bold", paddingRight: 8 }}
                className="mzp-c-card-desc"
              >
                {columnName}
              </p>
              {childElement}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor,
          flexDirection: "row",
          padding: 16,
        }}
        onClick={onClick}
      >
        {children?.map((childElement, index) => {
          const width = columnDistribution ? columnDistribution[index] : "0%";
          return (
            <div key={index} style={{ width }}>
              {childElement}
            </div>
          );
        })}
      </div>
    );
  }
};

export default ReactiveTableRow;
