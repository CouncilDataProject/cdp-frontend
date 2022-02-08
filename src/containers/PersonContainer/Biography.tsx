import React, { FC, useMemo } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";

import Details from "../../components/Shared/Details";
import { Ul, H2 } from "./styledComponents";

import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

const BiographyContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 64,
  [`@media (min-width:${screenWidths.tablet})`]: {
    gridTemplateColumns: "auto 1fr",
    columnGap: 128,
    "& > div:nth-of-type(2)": {
      gridColumnEnd: -1,
    },
    "& > div:nth-of-type(3)": {
      gridColumnStart: 1,
      gridColumnEnd: -1,
    },
  },
});

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

interface BiographyProps {
  /** The person being displayed */
  person: Person;
  /** The person's councilmember roles */
  councilMemberRoles: Role[];
  /** The person's non councilmember roles,
   * partitioned by concilmember roles' date range
   * and whether the role is active or inactive.
   * The first list of roles are active, while the second list of roles are inactive.
   */
  nonCouncilMemberRoles: Record<string, Role[][]>;
  /** The legislation or matters sponsored by this person */
  mattersSponsored: MatterSponsor[];
}

const Biography: FC<BiographyProps> = ({
  person,
  councilMemberRoles,
  nonCouncilMemberRoles,
}: BiographyProps) => {
  const contactContent = useMemo(() => {
    if (person.email || person.phone || person.website) {
      return (
        <Contact>
          <H2>Contact</H2>
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
  }, [person]);

  const rolesContent = useMemo(() => {
    if (councilMemberRoles.length === 0) {
      return null;
    }
    return (
      <div>
        <H2>Terms</H2>
        <Ul gap={16}>
          {councilMemberRoles.map((role) => {
            const isCurrentRole = !role.end_datetime || role.end_datetime > new Date();
            return (
              <li key={role.id}>
                <Details
                  defaultOpen={isCurrentRole}
                  summaryContent={
                    <span style={{ fontSize: fontSizes.font_size_6 }}>
                      <strong>{`${role.title}: `}</strong>{" "}
                      {`${role.seat?.name} // ${
                        role.seat?.electoral_area
                      } (${role.start_datetime.toLocaleDateString()} - ${
                        role.end_datetime ? role.end_datetime.toLocaleDateString() : ""
                      })`}
                    </span>
                  }
                  hiddenContent={
                    <Ul gap={8}>
                      {nonCouncilMemberRoles[role.id][0].length > 0 && (
                        <li>
                          <Details
                            defaultOpen={isCurrentRole}
                            summaryContent={<span>Committee Membership</span>}
                            hiddenContent={
                              <Ul gap={4}>
                                {nonCouncilMemberRoles[role.id][0].map((nonTermRole) => (
                                  <li key={nonTermRole.id}>
                                    <strong>{`${nonTermRole.title}: `}</strong>
                                    <Link
                                      to={{
                                        pathname: "/events",
                                        state: {
                                          committees: { [nonTermRole.body?.id as string]: true },
                                        },
                                      }}
                                    >
                                      <strong>{`${nonTermRole.body?.name}`}</strong>
                                    </Link>
                                  </li>
                                ))}
                              </Ul>
                            }
                          />
                        </li>
                      )}
                      {nonCouncilMemberRoles[role.id][1].length > 0 && (
                        <li>
                          <Details
                            defaultOpen={!isCurrentRole}
                            summaryContent={<span>Former Committee Membership</span>}
                            hiddenContent={
                              <Ul gap={4}>
                                {nonCouncilMemberRoles[role.id][1].map((inactiveRole) => (
                                  <li key={inactiveRole.id}>
                                    <strong>{`${inactiveRole.title}: `}</strong>
                                    <Link
                                      to={{
                                        pathname: "/events",
                                        state: {
                                          committees: { [inactiveRole.body?.id as string]: true },
                                        },
                                      }}
                                    >
                                      <strong>{`${inactiveRole.body?.name}`}</strong>
                                    </Link>
                                  </li>
                                ))}
                              </Ul>
                            }
                          />
                        </li>
                      )}
                    </Ul>
                  }
                />
              </li>
            );
          })}
        </Ul>
      </div>
    );
  }, [nonCouncilMemberRoles, councilMemberRoles]);

  return (
    <BiographyContainer>
      {contactContent}
      {rolesContent}
    </BiographyContainer>
  );
};

export { Biography, BiographyProps };
