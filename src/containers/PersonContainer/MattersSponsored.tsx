import React, { FC, useMemo, useCallback } from "react";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
import useFetchModels, {
  FetchModelsActionType,
  FetchModelsState,
} from "../../hooks/useFetchModels";

import MatterSponsorService from "../../networking/MatterSponsorService";

import MatterSponsor from "../../models/MatterSponsor";

import LazyFetchDataContainer from "../FetchDataContainer/LazyFetchDataContainer";
import { FETCH_MATTERS_SPONSORED_BATCH_SIZE } from "./constants";

import Details from "../../components/Shared/Details";
import H2 from "../../components/Shared/H2";
import ShowMoreCards from "../../components/Shared/ShowMoreCards";
import Ul from "../../components/Shared/Ul";

import { strings } from "../../assets/LocalizedStrings";

interface MattersSponsoredProps {
  personId: string;
}

const MattersSponsored: FC<MattersSponsoredProps> = ({ personId }: MattersSponsoredProps) => {
  const { firebaseConfig } = useAppConfigContext();

  const fetchMattersSponsoredFunctionCreator = useCallback(
    (state: FetchModelsState<MatterSponsor>) => async () => {
      const lastVisibleMatterSponsorId =
        !state.fetchModels && state.models.length > 0
          ? state.models[state.models.length - 1].id
          : undefined;
      const matterSponsorService = new MatterSponsorService(firebaseConfig);
      const mattersSponsored = await matterSponsorService.getMattersSponsoredByPersonId(
        personId,
        state.batchSize,
        lastVisibleMatterSponsorId
      );
      return Promise.resolve(mattersSponsored);
    },
    [firebaseConfig, personId]
  );

  const { state, dispatch } = useFetchModels(
    {
      batchSize: FETCH_MATTERS_SPONSORED_BATCH_SIZE,
      models: [],
      fetchModels: true,
      showMoreModels: false,
      hasMoreModels: false,
      error: null,
    },
    fetchMattersSponsoredFunctionCreator
  );

  const handleShowMoreMattersSponsored = useCallback(
    () => dispatch({ type: FetchModelsActionType.FETCH_MODELS, payload: false }),
    [dispatch]
  );
  const hiddenContent = useMemo(() => {
    return (
      <LazyFetchDataContainer
        data="legislations"
        isLoading={state.fetchModels}
        error={state.error}
        notFound={!state.fetchModels && state.models.length === 0}
      >
        <Ul gap={8}>
          {state.models.map((matterSponsored) => (
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
        <br />
        <ShowMoreCards isVisible={!state.fetchModels && state.hasMoreModels}>
          <button
            className="mzp-c-button mzp-t-secondary mzp-t-lg"
            onClick={handleShowMoreMattersSponsored}
          >
            <span>{strings.show_more}</span>
            <Loader inline active={state.showMoreModels} size="tiny" />
          </button>
        </ShowMoreCards>
      </LazyFetchDataContainer>
    );
  }, [state, handleShowMoreMattersSponsored]);

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
        hiddenContent={hiddenContent}
      />
    </div>
  );
};

export default MattersSponsored;
