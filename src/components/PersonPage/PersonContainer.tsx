import React, { useEffect, useState } from "react";
import Person from "../../models/Person";
import { PersonService } from "../../networking/PersonService";
import "@mozilla-protocol/core/protocol/css/protocol.css";

const PersonContainer: React.FC = () => {
  const [person, setPerson] = useState<Person | undefined>(undefined);

  useEffect(() => {
    let personService = new PersonService();
    const fetchData = async () => {
      const slug = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
      const result = await personService.getPerson(slug);
      setPerson(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      {person && (
        <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
          {`${JSON.stringify(person)}`}
        </p>
      )}
      {!person && (
        <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
          No response yet
        </p>
      )}
    </div>
  );
};

export default PersonContainer;
