import React from "react";

import "@councildataproject/cdp-design/dist/colors.css";

const LegislationRejectedIcon = () => {
  return (
    <svg
      className="cdp-red"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  );
};

export default LegislationRejectedIcon;
