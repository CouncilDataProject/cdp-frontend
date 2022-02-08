import React, { FC } from "react";
import styled from "@emotion/styled";

import Person from "../../models/Person";

import { H2 } from "./styledComponents";

import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";

const Contact = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: 32,
  "& > address": {
    display: "flex",
    flexDirection: "column",
    rowGap: 8,
  },
  "& a": {
    fontSize: fontSizes.font_size_5,
    display: "flex",
    alignItems: "center",
    columnGap: 8,
  },
  "& svg": {
    width: fontSizes.font_size_5,
    height: fontSizes.font_size_5,
    color: colors.black,
  },
});

interface ContactPersonProps {
  person: Person;
}

const ContactPerson: FC<ContactPersonProps> = ({ person }: ContactPersonProps) => {
  if (person.phone || person.email || person.website) {
    return (
      <Contact>
        <H2>Contact</H2>
        {(person.phone || person.email) && (
          <address>
            {person.email && (
              <a className="mzp-c-cta-link" href={`mailto:${person.email}`}>
                <svg
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {person.email}
              </a>
            )}
            {person.phone && (
              <a className="mzp-c-cta-link" href={`tel:${person.phone}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {person.phone}
              </a>
            )}
          </address>
        )}
        {person.website && (
          <a
            className="mzp-c-cta-link"
            target="_blank"
            rel="noopener noreferrer"
            href={person.website}
          >
            {`Visit ${person.name}'s website`}
          </a>
        )}
      </Contact>
    );
  }

  return null;
};

export default ContactPerson;
