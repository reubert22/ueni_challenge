import { MINUTE_TO_PIXEL_RATIO } from "../constants";
import { DateTime } from "luxon";
import moment, { Moment } from "moment";
import { TimeEvent } from "../types/TimeEvent";

export function calculateLeftValue(
  timeLineStart: DateTime,
  selectedStart: DateTime
) {
  return (
    selectedStart.diff(timeLineStart).as("minutes") * MINUTE_TO_PIXEL_RATIO
  );
}

export function calculateWidthValue(
  selectedStart: DateTime,
  selectedEnd: DateTime
) {
  return selectedEnd.diff(selectedStart).as("minutes") * MINUTE_TO_PIXEL_RATIO;
}

export const groupBy = (xs: any[], key: string) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const convertMomentToDateTime = (time: Moment | string): DateTime => {
  const iso = moment(time).toISOString();
  return DateTime.fromISO(iso);
};

export const convertDateTimeToMoment = (time: DateTime): Moment => {
  const isoTime = time.toISO();
  return moment(isoTime);
};

const convertISOToDateTime = (time: string): DateTime => DateTime.fromISO(time);

const checkIfTimeIsContainedByEvent = (
  intervalStart: DateTime,
  intervalEnd: DateTime,
  start: string,
  end: string
): boolean =>
  intervalStart >= convertISOToDateTime(start) &&
  intervalEnd <= convertISOToDateTime(end);

const checkIfTimeIsConflict = (
  intervalStart: DateTime,
  intervalEnd: DateTime,
  start: string,
  end: string
): boolean =>
  (intervalStart < convertISOToDateTime(start) &&
    intervalEnd > convertISOToDateTime(start)) ||
  (intervalStart < convertISOToDateTime(end) &&
    intervalEnd > convertISOToDateTime(end));

const checkIfTimeContainsEvent = (
  intervalStart: DateTime,
  intervalEnd: DateTime,
  start: string,
  end: string
): boolean =>
  intervalStart < convertISOToDateTime(start) &&
  intervalEnd > convertISOToDateTime(end);

export function isIntervalFree(
  events: TimeEvent[],
  intervalStart: DateTime,
  intervalEnd: DateTime
): boolean {
  return !events.some(
    (event) =>
      checkIfTimeIsConflict(
        intervalStart,
        intervalEnd,
        event.start,
        event.end
      ) ||
      checkIfTimeIsContainedByEvent(
        intervalStart,
        intervalEnd,
        event.start,
        event.end
      ) ||
      checkIfTimeContainsEvent(
        intervalStart,
        intervalEnd,
        event.start,
        event.end
      )
  );
}

export const generateID = () => "_" + Math.random().toString(36).substr(2, 9);
