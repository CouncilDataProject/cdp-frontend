import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import ordinalSuffix from "../../utils/ordinalSuffix";
import { filterRolesByTitle } from "../../models/util/RoleUtilities";
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
      return !role.end_datetime;
    })
    .map((role) => {
      return role.body?.name || "Unknown Board";
    });

  const viceChairBodyNames = filterRolesByTitle(roles, ROLE_TITLE.VICE_CHAIR)
    .filter((role) => {
      return !role.end_datetime;
    })
    .map((role) => {
      return role.body?.name || "Unknown Board";
    });

  const memberBodyNames = filterRolesByTitle(roles, ROLE_TITLE.MEMBER)
    .filter((role) => {
      return !role.end_datetime;
    })
    .map((role) => {
      return role.body?.name || "Unknown Board";
    });
  /* 
    The first paragraph.
  */
  const lastName = person.name
    ? [person.name.substring(person.name.lastIndexOf(" ") + 1, person.name.length)]
    : "Unknown Name";
  const addressName = `${mostRecentCouncilMemberRole.title} ${lastName}`;
  const introText = `${addressName} is the ${mostRecentCouncilMemberRole.title} of ${municipalityName}'s ${mostRecentCouncilMemberRole.seat?.name}(${mostRecentCouncilMemberRole.seat?.electoral_area}).`;
  /* 
    The second paragraph.
  */

  const termsSentence = `${addressName} is serving their ${ordinalSuffix(
    councilMemberRoles.length
  )} term.`;
  const chairsSentence =
    chairBodyNames.length > 0
      ? `They currently serve as Chair of the following bodies: ${chairBodyNames.join(", ")}.`
      : "They currently hold no Chairs.";
  const viceChairSentence =
    viceChairBodyNames.length > 0
      ? `They currently serve as Vice-Chair of the following bodies: ${viceChairBodyNames.join(
          ", "
        )}.`
      : "";
  const membershipSentence =
    memberBodyNames.length > 0
      ? `They currently serve as a member on the following bodies: ${memberBodyNames.join(", ")}.`
      : "";

  const sponsoredSentence = `They have sponsored ${mattersSponsored.length} pieces of legislation.`;
  const bioText: string = [
    termsSentence,
    chairsSentence,
    viceChairSentence,
    membershipSentence,
    sponsoredSentence,
  ].join(` `);
  return {
    bioText,
    introText,
  };
}

export { writeBiography };
