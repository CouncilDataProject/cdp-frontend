import React, { FC, useMemo } from "react";
import styled from "@emotion/styled";

import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";

import Details from "../../components/Shared/Details";

import { TAG_CONNECTOR } from "../../constants/StyleConstants";
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

const BioItem = styled.div({
  fontSize: fontSizes.font_size_7,
  fontWeight: 600,
});

const Ul = styled.ul<{ gap: number }>((props) => ({
  marginLeft: 16,
  marginBottom: 0,
  "& > li": {
    marginTop: props.gap,
  },
}));

const Contact = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: 16,
  "& a": {
    fontSize: fontSizes.font_size_5,
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
  mattersSponsored,
}: BiographyProps) => {
  const contactContent = useMemo(() => {
    if (person.email || person.phone || person.website) {
      return (
        <Contact>
          <BioItem>Contact</BioItem>
          <address>
            {person.email && (
              <a className="mzp-c-cta-link" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            )}
            <br />
            {person.phone && (
              <a className="mzp-c-cta-link" href={`tel:${person.phone}`}>
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
        <BioItem>Terms</BioItem>
        <Ul gap={16}>
          {councilMemberRoles.map((role) => {
            const isCurrentRole = !role.end_datetime || role.end_datetime > new Date();
            return (
              <li key={role.id}>
                <Details
                  defaultOpen={isCurrentRole}
                  summaryContent={
                    <span style={{ fontSize: fontSizes.font_size_5 }}>
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
                            summaryContent={<span>Active committees</span>}
                            hiddenContent={
                              <Ul gap={4}>
                                {nonCouncilMemberRoles[role.id][0].map((nonTermRole) => (
                                  <li key={nonTermRole.id}>
                                    <strong>{`${nonTermRole.title}: `}</strong>
                                    {`${nonTermRole.body?.name}`}
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
                            summaryContent={
                              <span>{isCurrentRole ? "Inactive committees" : "Committees"}</span>
                            }
                            hiddenContent={
                              <Ul gap={4}>
                                {nonCouncilMemberRoles[role.id][1].map((inactiveRole) => (
                                  <li key={inactiveRole.id}>
                                    <strong>{`${inactiveRole.title}: `}</strong>
                                    {`${inactiveRole.body?.name}`}
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

  const matterSponsoredContent = useMemo(() => {
    if (mattersSponsored.length === 0) {
      return null;
    }
    return (
      <div>
        <Details
          defaultOpen={false}
          summaryContent={
            <BioItem
              style={{ display: "inline" }}
            >{`${mattersSponsored.length} legislation(s) sponsored`}</BioItem>
          }
          hiddenContent={
            <Ul gap={8}>
              {mattersSponsored.map((matterSponsor) => (
                <li key={matterSponsor.id}>
                  <dl>
                    <dt>
                      <strong>{matterSponsor.matter?.name}</strong>
                    </dt>
                    <dd>{matterSponsor.matter?.title}</dd>
                  </dl>
                </li>
              ))}
            </Ul>
          }
        />
      </div>
    );
  }, [mattersSponsored]);

  return (
    <BiographyContainer>
      {contactContent}
      {rolesContent}
      {matterSponsoredContent}
    </BiographyContainer>
  );
};

export { Biography, BiographyProps };
