import { useReducer, useCallback } from "react";
import { EventReducerTypes } from "../constants";
import { eventReducer, EventInitialState } from "../reducers/eventReducer";

export const useEvent = () => {
  const [state, dispatch] = useReducer(eventReducer, EventInitialState);

  const filtered = state.events.filter(
    (event) => event.name === state.filter.filterValue
  );

  const setEvents = useCallback((item) => {
    dispatch({
      type: EventReducerTypes.SET_EVENTS,
      item,
    });
  }, []);

  const setEvent = useCallback((item) => {
    dispatch({
      type: EventReducerTypes.SET_EVENT,
      item,
    });
  }, []);

  const setFilterOptions = useCallback((options) => {
    dispatch({
      type: EventReducerTypes.SET_FILTER_OPTIONS,
      item: options,
    });
  }, []);

  const setFilterValue = useCallback((value) => {
    dispatch({
      type: EventReducerTypes.SET_FILTER_VALUE,
      item: value,
    });
  }, []);

  const setStartTime = useCallback((item) => {
    dispatch({
      type: EventReducerTypes.SET_START_TIME,
      item,
    });
  }, []);

  const setEndTime = useCallback((item) => {
    dispatch({
      type: EventReducerTypes.SET_END_TIME,
      item,
    });
  }, []);

  return {
    state: {
      ...state,
      events: !!state.filter.filterValue ? filtered : state.events,
    },
    setEvents,
    setFilterOptions,
    setFilterValue,
    setStartTime,
    setEndTime,
    setEvent,
  };
};
