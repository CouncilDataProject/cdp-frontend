import React, { FC } from "react";
import { Link } from "react-router-dom";

import Role from "../../models/Role";

import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import Ul from "../../components/Shared/Ul";

import { fontSizes } from "../../styles/fonts";

interface CommitteeMembershipProps {
  roles: Role[];
  defaultOpen: boolean;
  title: string;
}
const CommitteeMembership: FC<CommitteeMembershipProps> = ({ roles, defaultOpen, title }) => {
  if (roles.length === 0) {
    return null;
  }

  return (
    <li>
      <Details
        defaultOpen={defaultOpen}
        summaryContent={<span>{title}</span>}
        hiddenContent={
          <Ul gap={4}>
            {roles.map((role) => (
              <li key={role.id}>
                <strong>{`${role.title}: `}</strong>
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
    </li>
  );
};

interface PersonRolesProps {
  /** The person's councilmember roles */
  councilMemberRoles: Role[];
  /** The person's non councilmember roles, partitioned by concilmember roles' date range
   * and whether the role is active or inactive.
   * The first list of roles are active, while the second list of roles are inactive.
   */
  nonCouncilMemberRoles: Record<string, Role[][]>;
}

const PersonRoles: FC<PersonRolesProps> = ({
  councilMemberRoles,
  nonCouncilMemberRoles,
}: PersonRolesProps) => {
  // councilMemberRoles is guaranteed to have > 0 roles
  return (
    <div>
      <H2 hasBorderBottom={true} className="mzp-u-title-xs">
        Terms
      </H2>
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
                    <CommitteeMembership
                      roles={nonCouncilMemberRoles[role.id][0]}
                      defaultOpen={isCurrentRole}
                      title="Committee Membership"
                    />
                    <CommitteeMembership
                      roles={nonCouncilMemberRoles[role.id][1]}
                      defaultOpen={!isCurrentRole}
                      title="Former Committee Membership"
                    />
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
