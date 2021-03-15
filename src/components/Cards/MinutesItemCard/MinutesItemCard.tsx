import React, { FC } from "react";

import "@mozilla-protocol/core/protocol/css/protocol.css";

interface Docs {
  /**Document item label */
  label: string;
  /**Document item url */
  url: string;
}

interface Items {
  /**Minute item headline */
  item: string;
  /**Array of documents to be shown below */
  docs?: Docs[];
}

export interface MinutesItemProps {
  minutesItems: Items[];
}

function returnDocList(docs: Docs[] | undefined) {
  if (docs !== undefined) {
    return (
      <section>
        <details>
          <summary style={{ color: "blue" }}>
            <p>See documents</p>
          </summary>
          <ul className="mzp-u-list-styled" style={{ listStyleType: "none" }}>
            {docs.map((doc) => {
              return (
                <li key={doc.label}>
                  <a href={doc.url}>{doc.label}</a>
                </li>
              );
            })}
          </ul>
        </details>
      </section>
    );
  }
}

const MinutesItemCard: FC<MinutesItemProps> = ({ minutesItems }: MinutesItemProps) => {
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

export default MinutesItemCard;
