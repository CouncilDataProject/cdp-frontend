import React, { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import DocumentsList from "./DocumentsList";
import ChevronDownIcon from "../../Shared/ChevronDownIcon";

import { Item } from "./types";

const ListItem = styled.li({
  "& > div:first-of-type": {
    // bold the minutes item's name
    fontWeight: 600,
  },
  "& > a": {
    display: "flex",
    alignItems: "center",
  },
  "& > a > svg": {
    width: "1rem",
    height: "1rem",
    transform: "rotate(-90deg)",
  },
});

export interface MinutesItemsListProps {
  /**
   * List of minutes items headlines, each of which may have a list of associated documents
   */
  minutesItems: Item[];
}

const MinutesItemsList: FC<MinutesItemsListProps> = ({ minutesItems }: MinutesItemsListProps) => {
  return (
    <ol className="mzp-u-list-styled">
      {minutesItems.map((elem) => {
        return (
          <ListItem key={elem.name}>
            <div>{elem.name}</div>
            {elem.matter_ref && (
              <Link to={`/matters/${elem.matter_ref}`}>
                {"Go to Full Legislation Details"} <ChevronDownIcon />
              </Link>
            )}
            {elem.description && <div>{elem.description}</div>}
            <DocumentsList documents={elem.documents} />
          </ListItem>
        );
      })}
    </ol>
  );
};

export default MinutesItemsList;
