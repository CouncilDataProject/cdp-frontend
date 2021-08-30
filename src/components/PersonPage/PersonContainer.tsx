import React, { useEffect, useState } from "react";
import Person from "../../models/Person";
import PersonService from "../../networking/PersonService";
import { useLocation } from "react-router-dom";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type PersonContainerProps = {
  /** optional person overrides fetch for testing */
  testPerson?: Person;
};

const PersonContainer = ({ testPerson }: PersonContainerProps) => {
  // 283ffb6c5a48
  const [person, setPerson] = useState<Person | undefined>(testPerson);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const personService = new PersonService();
    const fetchData = async () => {
      const slug = useLocation().pathname.replace("/", "");
      try {
        const result = await personService.getPersonById(slug);
        setPerson(result);
        setError(undefined);
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
