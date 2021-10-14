import React from "react";
import Person from "../../models/Person";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "@mozilla-protocol/core/protocol/css/protocol.css";

export type PersonContainerProps = {
  /** The person's data */
  person: Person;
};

const PersonContainer = ({ person }: PersonContainerProps) => {
  useDocumentTitle(person.name);

  return (
    <div>
      <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
        {`${JSON.stringify(person)}`}
      </p>
    </div>
  );
};

export default PersonContainer;
