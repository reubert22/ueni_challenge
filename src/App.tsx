import React, { useMemo, useEffect, useCallback } from "react";
import { DateTime } from "luxon";
import { getAllEvents } from "./api/events/service";
import { MainContext } from "./hooks/useMainContext";
import { useEvent } from "./hooks/useEvent";
import { useLoading } from "./hooks/useLoading";
import ControlsBar from "./components/ControlsBar/ControlsBar";
import Event from "./components/Event";
import Loader from "./components/Loader";
import SelectedTime from "./components/SelectedTime/SelectedTime";
import styled from "styled-components";
import Timeline from "./components/TimeLine";
import { groupBy } from "./utils";
import { EventType } from "./types/Event";

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlsBar)`
  margin: 2rem 0;
`;

const MainTitle = styled.span`
  font-size: 22px;
  color: #3f51b5;
`;

const SubTitle = styled.p`
  font-size: 12px;
  color: #4caf50;
  margin: 0px;
`;

function App() {
  const loading = useLoading();
  const event = useEvent();

  const handleGetEvents = useCallback(async () => {
    loading.setLoading(true);
    const response = await getAllEvents();
    event.setEvents({ events: response });

    const arrOptions = groupBy(response, "name");
    event.setFilterOptions({
      filter: {
        filterOptions: Object.keys(arrOptions)
          .sort()
          .map((item: any) => item),
      },
    });
    loading.setLoading(false);
  }, []);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

  const timeLineStart = useMemo(
    () =>
      DateTime.local().set({ minute: 0, hour: 0, second: 0, millisecond: 0 }),
    []
  );

  return (
    <MainContext.Provider value={{ loading, event }}>
      <Root className="App">
        <MainTitle>Scheduler</MainTitle>
        <SubTitle>
          * Check for an available time and schedule event with a professional
        </SubTitle>
        <StyledControlBar timeLineStart={timeLineStart} />
        <Timeline timeLineStart={timeLineStart}>
          <Loader />
          <SelectedTime timeLineStart={timeLineStart} />
          {event.state.events.length !== 0 &&
            event.state.events.map((event: EventType) => (
              <Event
                item={event}
                key={`event-${event.id}`}
                timeLineStart={timeLineStart}
              />
            ))}
        </Timeline>
      </Root>
    </MainContext.Provider>
  );
}

export default App;
