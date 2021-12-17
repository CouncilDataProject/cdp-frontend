import React, { FC, useState } from "react";
import styled from "@emotion/styled";

import { Document } from "./types";
import MinusIcon from "../../Shared/MinusIcon";
import PlusIcon from "../../Shared/PlusIcon";

import { strings } from "../../../assets/LocalizedStrings";
import colors from "../../../styles/colors";

const Summary = styled.summary({
  color: colors.dark_blue,
  display: "flex",
  alignItems: "center",
  "&::before": {
    // remove mozilla protocol +/- icon
    content: "none",
  },
  "&::marker": {
    // remove triangle marker
    content: "none",
  },
  "& svg": {
    marginLeft: 4,
    // limit the width and height of +/- icon
    width: "1rem",
    height: "1rem",
  },
});

interface DocumentsListProps {
  documents?: Document[];
}

const DocumentsList: FC<DocumentsListProps> = ({ documents }: DocumentsListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onToggleIsExpanded = () => setIsExpanded((prev) => !prev);

  if (!documents || documents.length === 0) {
    return null;
  }
  return (
    <details open={isExpanded} onToggle={onToggleIsExpanded}>
      <Summary>
        {strings.see_documents}
        {isExpanded ? <MinusIcon /> : <PlusIcon />}
      </Summary>
      <ul>
        {documents.map((doc) => {
          return (
            <li key={doc.label}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.label}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default DocumentsList;
