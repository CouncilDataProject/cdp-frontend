import React, { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppConfigContext } from "../../app";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { MatterContainer } from "../../containers/MatterContainer";

import MatterStatus from "../../models/MatterStatus";
import IndexedMatterGram from "../../models/IndexedMatterGram";
import EventMinutesItem from "../../models/EventMinutesItem";
import Event from "../../models/Event";
import Person from "../../models/Person";
import Vote from "../../models/Vote";

import MatterStatusService from "../../networking/MatterStatusService";
import EventService from "../../networking/EventService";
import MatterSponsorService from "../../networking/MatterSponsorService";
import VoteService from "../../networking/VoteService";

interface MatterContainerType {
  matterStatus: MatterStatus;
  indexedMatterGrams: IndexedMatterGram[];
  event?: Event;
  sponsors: Person[];
  votes?: Vote[];
  legislationHistory: EventMinutesItem[];
}

const MatterPage: FC = () => {
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();
  // Get the id the matter, provided the route is `matter/:id`
  const { id } = useParams<{ id: string }>();
  //TODO: change these to Promise.all

  const fetchMatterStatus = useCallback(async () => {
    const matterStatusService = new MatterStatusService(firebaseConfig);
    const matterSponsorService = new MatterSponsorService(firebaseConfig);
    const eventService = new EventService(firebaseConfig);

    const matterSponsors = await matterSponsorService.getMatterSponsorByMatterId(id);
    const sponsors = matterSponsors
      .filter((matterSponsor) => {
        return matterSponsor.person;
      })
      .map((matterSponsor) => {
        return matterSponsor.person as Person;
      });

    const matterStatuses = await matterStatusService.getMatterStatusesByMatterId(id);
    const legislationHistory = matterStatuses.reduce((filtered, optional) => {
      if (optional.event_minutes_item) {
        filtered.push(optional.event_minutes_item);
      }
      return filtered;
    }, [] as EventMinutesItem[]);

    const latestStatus = matterStatuses[0];
    const matterContainerData: MatterContainerType = {
      matterStatus: latestStatus,
      indexedMatterGrams: [],
      sponsors,
      legislationHistory,
    };

    // loop through matterStatuses until we find one where the
    // event_minutes_item is not null
    let latestEventMinutesItem: EventMinutesItem | undefined;
    for (const matterStatus of matterStatuses) {
      if (matterStatus.event_minutes_item) {
        latestEventMinutesItem = matterStatus.event_minutes_item;
        break;
      }
    }
    if (latestEventMinutesItem) {
      const votesService = new VoteService(firebaseConfig);
      matterContainerData.votes = await votesService.getVotesByEventMinutesItemId(
        latestEventMinutesItem.id
      );
      matterContainerData.event = await eventService.getEventById(latestEventMinutesItem.event_ref);
    }
    return matterContainerData;
  }, [firebaseConfig, id]);

  const { state: matterStatusState } = useFetchData<MatterContainerType>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchMatterStatus
  );

  return (
    <FetchDataContainer isLoading={matterStatusState.isLoading} error={matterStatusState.error}>
      {matterStatusState.data && (
        <MatterContainer
          indexedMatterGrams={matterStatusState.data.indexedMatterGrams}
          matterStatus={matterStatusState.data.matterStatus}
          sponsors={matterStatusState.data.sponsors}
          event={matterStatusState.data.event}
          votes={matterStatusState.data.votes}
          legislationHistory={matterStatusState.data.legislationHistory}
        />
      )}
    </FetchDataContainer>
  );
};

export default MatterPage;
