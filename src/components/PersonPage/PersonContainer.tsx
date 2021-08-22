import React, { useEffect, useState } from "react";
import Person from "../../models/Person";
import { PersonService } from "../../networking/PersonService";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type PersonContainerProps = {
  /** optional person overrides fetch for testing */
  testPerson?: Person;
  testPersonId?: string;
};

const PersonContainer = ({ testPerson, testPersonId }: PersonContainerProps) => {
  // 283ffb6c5a48
  const [person, setPerson] = useState<Person | undefined>(testPerson);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let personService = new PersonService();
    const fetchData = async () => {
      const slug = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
      try {
        if (testPersonId) {
          const result = await personService.getPerson(testPersonId);
          setPerson(result);
          setError(undefined);
        } else {
          const result = await personService.getPerson(slug);
          setPerson(result);
          setError(undefined);
        }
      } catch (networkError) {
        setError(networkError);
      }
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
      {!person && !error && (
        <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
          No response yet
        </p>
      )}
      {error && (
        <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PersonContainer;
