import React from "react";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type EmptyRowProps = {
  /** the index of this row */
  index: number;
};

const EmptyRow = ({ index }: EmptyRowProps) => {
  const backgroundColor = index % 2 === 0 ? "rgb(236,236,236)" : "white";
  const displayText = index === 0 ? "No results found." : "Record missing.";
  return (
    <tr
      style={{
        backgroundColor,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 8,
      }}
      key={`empty-row-${index}`}
    >
      <h6 className="mzp-c-card-desc">{displayText}</h6>
    </tr>
  );
};

export default EmptyRow;
