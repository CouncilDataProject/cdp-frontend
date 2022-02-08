import React, { FC } from "react";
import { Link } from "react-router-dom";

import Role from "../../models/Role";

import Details from "../../components/Shared/Details";
import { Ul, H2 } from "./styledComponents";
import { fontSizes } from "../../styles/fonts";

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
      <H2 className="mzp-u-title-xs">Terms</H2>
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
                              {nonCouncilMemberRoles[role.id][0].map((activeRole) => (
                                <li key={activeRole.id}>
                                  <strong>{`${activeRole.title}: `}</strong>
                                  <Link
                                    to={{
                                      pathname: "/events",
                                      state: {
                                        committees: { [activeRole.body?.id as string]: true },
                                      },
                                    }}
                                  >
                                    <strong>{`${activeRole.body?.name}`}</strong>
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
};

export default PersonRoles;
