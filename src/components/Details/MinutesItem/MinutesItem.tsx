import React, { FC } from "react";
import styled from "@emotion/styled";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const DocumentsListOpen = styled.summary({
  width: "7.5rem",
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

export interface MinutesItemProps {
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
              <div>
                <a href={doc.url} key={doc.label}>
                  {doc.label}
                </a>
              </div>
            );
          })}
        </details>
      </section>
    );
  }
}

const MinutesItem: FC<MinutesItemProps> = ({ minutesItems }: MinutesItemProps) => {
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

export default MinutesItem;
