import React from "react";

type EmptyRowProps = {
  /** the index of this row */
  index: number;
};

const EmptyRow = ({ index }: EmptyRowProps) => {
  const backgroundColor = index % 2 === 0 ? "rgb(236,236,236)" : "white";
  const displayText = index === 0 ? "No results found." : "Record missing.";
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
      <p className="mzp-c-card-desc">{displayText}</p>
    </div>
  );
};

export default EmptyRow;
