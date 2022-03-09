import React, { FC, useMemo, useCallback } from "react";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
import useFetchModels, {
  FetchModelsActionType,
  FetchModelsState,
} from "../../hooks/useFetchModels";

import VoteService from "../../networking/VoteService";

import Vote from "../../models/Vote";

import LazyFetchDataContainer from "../FetchDataContainer/LazyFetchDataContainer";
import { FETCH_VOTES_BATCH_SIZE } from "./constants";
import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import ShowMoreCards from "../../components/Shared/ShowMoreCards";
import { VotingTable } from "../../components/Tables/VotingTable";

import { strings } from "../../assets/LocalizedStrings";

interface PersonVotesProps {
  personId: string;
  personName: string;
}

const PersonVotes: FC<PersonVotesProps> = ({ personId, personName }: PersonVotesProps) => {
  const { firebaseConfig } = useAppConfigContext();

  const fetchVotesFunctionCreator = useCallback(
    (state: FetchModelsState<Vote>) => async () => {
      const lastVisibleVoteId =
        !state.fetchModels && state.models.length > 0
          ? state.models[state.models.length - 1].id
          : undefined;
      const voteService = new VoteService(firebaseConfig);
      const votes = await voteService.getFullyPopulatedVotesByPersonId(
        personId,
        state.batchSize,
        lastVisibleVoteId
      );
      return Promise.resolve(votes);
    },
    [firebaseConfig, personId]
  );

  const { state, dispatch } = useFetchModels(
    {
      batchSize: FETCH_VOTES_BATCH_SIZE,
      models: [],
      fetchModels: true,
      showMoreModels: false,
      hasMoreModels: false,
      error: null,
    },
    fetchVotesFunctionCreator
  );

  const handleShowMoreVotes = useCallback(
    () => dispatch({ type: FetchModelsActionType.FETCH_MODELS, payload: false }),
    [dispatch]
  );

  const hiddenContent = useMemo(() => {
    return (
      <LazyFetchDataContainer
        data="votes"
        isLoading={state.fetchModels}
        error={state.error}
        notFound={!state.fetchModels && state.models.length === 0}
      >
        <VotingTable name={personName} votesPage={state.models} />
        <br />
        <ShowMoreCards isVisible={!state.fetchModels && state.hasMoreModels}>
          <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreVotes}>
            <span>{strings.show_more}</span>
            <Loader inline active={state.showMoreModels} size="tiny" />
          </button>
        </ShowMoreCards>
      </LazyFetchDataContainer>
    );
  }, [personName, state, handleShowMoreVotes]);

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
