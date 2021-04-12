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
      }}
      key={`empty-row-${index}`}
    >
      <td>
        <p className="mzp-c-card-desc">{displayText}</p>
      </td>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
  );
};

export default EmptyRow;
