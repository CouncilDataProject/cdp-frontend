import Role from "../Role";

enum ROLE_TITLE {
  CHAIR = "Chair",
  VICE_CHAIR = "Vice Chair",
  COUNCILMEMBER = "Councilmember",
  MEMBER = "Member",
  COUNCIL_PRESIDENT = "Council President",
}

function filterRolesByTitle(roles: Role[], title: ROLE_TITLE): Role[] {
  return roles.filter((role) => {
    return role.title === title;
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

export { ROLE_TITLE, filterRolesByTitle, getMostRecentRole };
