import Role from "../Role";
import { ROLE_TITLE } from "../constants";

function filterRolesByTitle(roles: Role[], title: ROLE_TITLE): Role[] {
  return roles.filter((role) => {
    return role.title === title;
  });
}

function getUniqueBodyRoles(roles: Role[]): Role[] {
  const setOfBodies: any = {};
  return roles.filter((role) => {
    if (role.body?.id) {
      if (setOfBodies[role.body.id] === true) {
        return false;
      } else {
        setOfBodies[role.body.id] = true;
        return true;
      }
    }
  });
}

function getCurrentUniqueBodyRoles(roles: Role[]): Role[] {
  return getUniqueBodyRoles(roles)
    .filter((role) => {
      if (role.title === ROLE_TITLE.COUNCILMEMBER) {
        return false;
      }
      if (!role.end_datetime) {
        return true;
      } else {
        if (role.end_datetime > new Date()) {
          return true;
        } else {
          return false;
        }
      }
    })
    .sort((roleA: Role, roleB: Role) => {
      if (roleA.title === ROLE_TITLE.CHAIR) {
        return -1;
      }
      if (roleA.title === ROLE_TITLE.VICE_CHAIR && roleB.title !== ROLE_TITLE.CHAIR) {
        return -1;
      }
      if (roleA.title === ROLE_TITLE.ALTERNATE && roleB.title !== ROLE_TITLE.MEMBER) {
        return -1;
      }

      return 1;
    });
}

function getMostRecentRole(roles: Role[]): Role {
  roles.sort((a, b) => {
    if (a.end_datetime && b.end_datetime) {
      // neither role is current
      if (a.end_datetime.getTime() > b.end_datetime.getTime()) {
        return 1; // term of 'a' ended after b, a is more current
      } else if (a.end_datetime.getTime() < b.end_datetime.getTime()) {
        return -1;
      } else {
        return 0;
      }
    } else {
      // one of the roles is the current role
      if (!a.end_datetime && !b.end_datetime) {
        return 0;
      } // they are... both currently-held?
      if (!a.end_datetime) return 1;
      if (!b.end_datetime) return -1;
      return 0;
    }
  });
  return roles[0];
}

function getUniqueTermRoles(roles: Role[]): Role[] {
  function dateRangeKey(a: Date, b?: Date): string {
    return `${a.toISOString()}${b?.toISOString()}`;
  }

  // unique the council member/president roles by start datetime and end datetime
  const uniqueRoles = [
    ...new Map(
      roles.map((role) => [dateRangeKey(role.start_datetime, role.end_datetime), role])
    ).values(),
  ];

  // recent roles first
  return uniqueRoles.sort((a, b) => {
    return b.start_datetime.getTime() - a.start_datetime.getTime();
  });
}

/**
 *
 * @param roles All roles of a person
 * @param termRoles Councilmember roles of a person. Only one role per term.
 * @returns Non-councilmember roles partitioned by the role.id of `termRoles` and whether the role is active.
 */
function partitionNonTermRoles(
  roles: Role[],
  termRoles: Role[]
): [Record<string, Role[][]>, Role[]] {
  const nonTermRoles = roles.filter(
    (role) => ![ROLE_TITLE.COUNCILMEMBER, ROLE_TITLE.COUNCILPRESIDENT].includes(role.title)
  );

  // sort by `nonTermRoleTitles`
  const nonTermRoleTitles = [
    ROLE_TITLE.CHAIR,
    ROLE_TITLE.VICE_CHAIR,
    ROLE_TITLE.MEMBER,
    ROLE_TITLE.ALTERNATE,
  ];
  nonTermRoles.sort((a, b) => {
    return nonTermRoleTitles.indexOf(a.title) - nonTermRoleTitles.indexOf(b.title);
  });

  // partition into active vs inactive roles
  const partition = termRoles.reduce((obj, role) => {
    // first list contains active roles, second list contains inactive roles
    obj[role.id] = [[], []];
    return obj;
  }, {} as Record<string, Role[][]>);
  const now = new Date();
  for (const nonTermRole of nonTermRoles) {
    const nonTermRoleEndDate = nonTermRole.end_datetime || now;
    for (const termRole of termRoles) {
      const termRoleEndDate = termRole.end_datetime || now;
      if (nonTermRoleEndDate >= termRole.start_datetime && nonTermRoleEndDate <= termRoleEndDate) {
        // the nonTermRole end date falls within the termRole date range
        if (nonTermRoleEndDate > now) {
          // active non term role
          partition[termRole.id][0].push(nonTermRole);
        } else {
          // inactive non term role
          partition[termRole.id][1].push(nonTermRole);
        }
      }
    }
  }

  return [partition, nonTermRoles];
}

export {
  filterRolesByTitle,
  getMostRecentRole,
  getCurrentUniqueBodyRoles,
  getUniqueTermRoles,
  partitionNonTermRoles,
};
