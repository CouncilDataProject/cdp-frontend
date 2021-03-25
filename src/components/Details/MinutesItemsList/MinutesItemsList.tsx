import React, { FC } from "react";
import styled from "@emotion/styled";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const DocumentsListOpen = styled.summary({
  width: "8.5rem",
});

const DocumentsListParagraph = styled.p({
  textDecoration: "underline",
});

interface Docs {
  /*Document item label */
  label: string;
  /*Document item url */
  url: string;
}

interface Items {
  /*Minute item headline */
  item: string;
  /*Array of documents to be shown below*/
  docs?: Docs[];
}

export interface MinutesItemsListProps {
  /*List of minutes items headlines, each of which
   may have a list of associated documents */
  minutesItems: Items[];
}

function returnDocList(docs: Docs[] | undefined) {
  if (docs) {
    return (
      <section>
        <details>
          <DocumentsListOpen>
            <DocumentsListParagraph>See documents</DocumentsListParagraph>
          </DocumentsListOpen>
          {docs.map((doc) => {
            return (
              <div key={doc.label}>
                <a href={doc.url}>{doc.label}</a>
              </div>
            );
          })}
        </details>
      </section>
    );
  }
}

const MinutesItemsList: FC<MinutesItemsListProps> = ({ minutesItems }: MinutesItemsListProps) => {
  return (
    <ol className="mzp-u-list-styled">
      {minutesItems.map((elem) => {
        return (
          <li key={elem.item}>
            <div>{elem.item}</div>
            <div>{returnDocList(elem.docs)}</div>
          </li>
        );
      })}
    </ol>
  );
};

export default MinutesItemsList;
