import React, { FC, useMemo, ReactNode } from "react";
import { Link } from "react-router-dom";

import Role from "../../models/Role";
import { getUniqueTermRoles, partitionNonTermRoles } from "../../models/util/RoleUtilities";

import { useLanguageConfigContext } from "../../app";

import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import Ul from "../../components/Shared/Ul";

import { fontSizes } from "../../styles/fonts";
import { strings } from "../../assets/LocalizedStrings";

interface CommitteeMembershipProps {
  hasBorderBottom: boolean;
  roles: Role[];
  defaultOpen: boolean;
  title: ReactNode;
}
const CommitteeMembership: FC<CommitteeMembershipProps> = ({
  hasBorderBottom,
  roles,
  defaultOpen,
  title,
}) => {
  return (
    <Details
      hasBorderBottom={hasBorderBottom}
      defaultOpen={defaultOpen}
      summaryContent={title}
      hiddenContent={
        <Ul gap={4}>
          {roles.map((role) => (
            <li key={role.id}>
              <strong>{`${strings[role.title.toLowerCase().replace(" ", "_")]}: `}</strong>
              <Link
                to={{
                  pathname: "/events",
                  search: `?body=${role.body?.id}`,
                  state: {
                    committees: { [role.body?.id as string]: true },
                  },
                }}
              >
                <strong>{`${role.body?.name}`}</strong>
              </Link>
            </li>
          ))}
        </Ul>
      }
    />
  );
};

interface PersonRolesProps {
  /** The person's councilmember roles */
  councilMemberRoles: Role[];
  /** All of the person's roles */
  allRoles: Role[];
}

const PersonRoles: FC<PersonRolesProps> = ({ councilMemberRoles, allRoles }: PersonRolesProps) => {
  const { language } = useLanguageConfigContext();

  const [termRoles, partitionedNonTermRoles, nonTermRoles] = useMemo(() => {
    const termRoles = getUniqueTermRoles(councilMemberRoles);
    const [partition, nonTermRoles] = partitionNonTermRoles(allRoles, termRoles);
    return [termRoles, partition, nonTermRoles];
  }, [councilMemberRoles, allRoles]);

  if (allRoles.length === 0) {
    return null;
  }

  if (termRoles.length === 0 && nonTermRoles.length > 0) {
    return (
      <CommitteeMembership
        hasBorderBottom={true}
        roles={nonTermRoles}
        defaultOpen={false}
        title={
          <H2 isInline={true} className="mzp-u-title-xs">
            {strings.committees}
          </H2>
        }
      />
    );
  }

  return (
    <div>
      <H2 hasBorderBottom={true} className="mzp-u-title-xs">
        {strings.terms}
      </H2>
      <Ul gap={16}>
        {termRoles.map((role) => {
          const isCurrentRole = !role.end_datetime || role.end_datetime > new Date();
          return (
            <li key={role.id}>
              <Details
                defaultOpen={isCurrentRole}
                summaryContent={
                  <span style={{ fontSize: fontSizes.font_size_6 }}>
                    <strong>{`${strings[role.title.toLowerCase().replace(" ", "_")]}: `}</strong>{" "}
                    {`${role.seat?.name} // ${
                      role.seat?.electoral_area
                    } (${role.start_datetime.toLocaleDateString(language)} - ${
                      role.end_datetime ? role.end_datetime.toLocaleDateString(language) : ""
                    })`}
                  </span>
                }
                hiddenContent={
                  <Ul gap={8}>
                    {partitionedNonTermRoles[role.id][0].length > 0 && (
                      <li>
                        <CommitteeMembership
                          hasBorderBottom={false}
                          roles={partitionedNonTermRoles[role.id][0]}
                          defaultOpen={isCurrentRole}
                          title={strings.committee_membership}
                        />
                      </li>
                    )}
                    {partitionedNonTermRoles[role.id][1].length > 0 && (
                      <li>
                        <CommitteeMembership
                          hasBorderBottom={false}
                          roles={partitionedNonTermRoles[role.id][1]}
                          defaultOpen={!isCurrentRole}
                          title={strings.former_committee_membership}
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
};

export default PersonRoles;
