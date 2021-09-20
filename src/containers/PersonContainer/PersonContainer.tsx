import React from "react";
import Person from "../../models/Person";
import "@mozilla-protocol/core/protocol/css/protocol.css";

export type PersonContainerProps = {
  /** The person's data */
  person: Person;
};

const PersonContainer = ({ person }: PersonContainerProps) => {
  return (
    <div>
      <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
        {`${JSON.stringify(person)}`}
      </p>
    </div>
  );
};

export default PersonContainer;
