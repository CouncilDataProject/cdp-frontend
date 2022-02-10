import React, { FC } from "react";

import MatterSponsor from "../../models/MatterSponsor";

import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import Ul from "../../components/Shared/Ul";
import { strings } from "../../assets/LocalizedStrings";

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
        hasBorderBottom={true}
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" isInline={true}>
            {strings.legislation_sponsored}
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
