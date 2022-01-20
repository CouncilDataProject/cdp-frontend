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

export { filterRolesByTitle, getMostRecentRole, getCurrentUniqueBodyRoles };
