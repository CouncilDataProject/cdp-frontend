import React, { FC } from "react";
import styled from "@emotion/styled";

import DocumentsList from "./DocumentsList";

import { Item } from "./types";
import { Link } from "react-router-dom";

const ListItem = styled.li({
  "& > div:first-of-type, & > a:first-of-type": {
    // bold the minutes item's name
    fontWeight: 600,
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
            {elem.matter_ref ? (
              <Link to={`/matters/${elem.matter_ref}`}>{elem.name}</Link>
            ) : (
              <div>{elem.name}</div>
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
