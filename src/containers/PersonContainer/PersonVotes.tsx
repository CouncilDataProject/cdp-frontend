import React, { FC, useMemo } from "react";

import Vote from "../../models/Vote";

import LazyFetchDataContainer from "../FetchDataContainer/LazyFetchDataContainer";
import { FetchDataState } from "../FetchDataContainer/useFetchData";
import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import { VotingTable } from "../../components/Tables/VotingTable";

import { strings } from "../../assets/LocalizedStrings";

interface PersonVotesProps {
  personName: string;
  votes: FetchDataState<Vote[]>;
}

const PersonVotes: FC<PersonVotesProps> = ({ personName, votes }: PersonVotesProps) => {
  const hiddenContent = useMemo(() => {
    return (
      <LazyFetchDataContainer
        data="votes"
        isLoading={votes.isLoading}
        error={votes.error}
        notFound={!votes.data || votes.data.length === 0}
      >
        {votes.data && <VotingTable name={personName} votesPage={votes.data} />}
      </LazyFetchDataContainer>
    );
  }, [personName, votes]);
  return (
    <Details
      hasBorderBottom={true}
      defaultOpen={false}
      summaryContent={
        <H2 className="mzp-u-title-xs" isInline={true}>
          {strings.persons_voting_record.replace("{person_name}", personName)}
        </H2>
      }
      hiddenContent={
        <>
          <br />
          {hiddenContent}
        </>
      }
    />
  );
};

export default PersonVotes;
