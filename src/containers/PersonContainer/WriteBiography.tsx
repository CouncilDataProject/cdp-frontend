import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import ordinalSuffix from "../../utils/ordinalSuffix";
import { filterRolesByTitle, getCurrentUniqueBodyRoles } from "../../models/util/RoleUtilities";
import { ROLE_TITLE } from "../../models/constants";

function writeBiography(
  person: Person,
  councilMemberRoles: Role[],
  roles: Role[],
  municipalityName: string,
  mattersSponsored: MatterSponsor[]
) {
  const mostRecentCouncilMemberRole = councilMemberRoles[0];
  // names of the bodies that the person is a part of
  const chairBodyNames = filterRolesByTitle(roles, ROLE_TITLE.CHAIR)
    .filter((role) => {
      if (!role.end_datetime) {
        return true;
      }
      if (role.end_datetime > new Date()) {
        return true;
      }
      return false;
    })
    .map((role) => {
      return role.body?.name || "Unknown Board";
    });
  const currentBodyMemberships = getCurrentUniqueBodyRoles(roles);
  /* 
    The first paragraph. An introduction to the Councilmember's current role and positions.
  */
  const lastName = person.name
    ? [person.name.substring(person.name.lastIndexOf(" ") + 1, person.name.length)]
    : "Unknown Name";
  const addressName = `${mostRecentCouncilMemberRole.title} ${lastName}`;
  const introText = `${addressName} represents ${mostRecentCouncilMemberRole.seat?.electoral_area} as ${mostRecentCouncilMemberRole.title} of ${mostRecentCouncilMemberRole.seat?.name}.`;
  const termsSentence = `${addressName} is serving their ${ordinalSuffix(
    councilMemberRoles.length
  )} term as a councilmember in ${municipalityName}.`;
  const chairsSentence =
    chairBodyNames.length > 0
      ? `They currently serve as Chair of the following bodies: ${chairBodyNames.join(", ")}.`
      : "They currently hold no Chairs.";

  const sponsoredSentence = `They have sponsored ${mattersSponsored.length} pieces of legislation.`;
  const bioText: string = [introText, termsSentence, chairsSentence, sponsoredSentence].join(` `);

  /* 
    The second paragraph - only if the person holds non-Chair, non-Councilmember roles
  */
  let memberships: string[] = [];
  if (currentBodyMemberships && currentBodyMemberships.length > 0) {
    memberships = currentBodyMemberships.map((role) => {
      return `${role.title} of the ${role.body?.name || "Unknown Board"}`;
    });
  }

  return {
    bioText,
    memberships,
  };
}

export { writeBiography };
