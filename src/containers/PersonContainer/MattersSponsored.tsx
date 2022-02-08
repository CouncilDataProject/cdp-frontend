import React, { FC } from "react";

import MatterSponsor from "../../models/MatterSponsor";

import Details from "../../components/Shared/Details";
import { Ul, H2 } from "./styledComponents";

interface MattersSponsoredProps {
  mattersSponsored: MatterSponsor[];
}

const MattersSponsored: FC<MattersSponsoredProps> = ({
  mattersSponsored,
}: MattersSponsoredProps) => {
  if (mattersSponsored.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: 16 }}>
      <Details
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" style={{ display: "inline" }}>
            Legislations Sponsored
          </H2>
        }
        hiddenContent={
          <Ul gap={8}>
            {mattersSponsored.map((matterSponsored) => (
              <li key={matterSponsored.id}>
                <dl>
                  <dt>
                    <strong>{matterSponsored.matter?.name}</strong>
                  </dt>
                  <dd>{matterSponsored.matter?.title}</dd>
                </dl>
              </li>
            ))}
          </Ul>
        }
      />
    </div>
  );
};

export default MattersSponsored;
