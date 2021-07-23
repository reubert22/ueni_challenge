import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { last } from "lodash";
import { DateTime } from "luxon";
import { calculateWidthValue, convertDateTimeToMoment } from "../../utils";
import { useMainContext } from "../../hooks/useMainContext";
import calculateNewInterval from "./utils";
import useControlsBar from "../ControlsBar/hooks/useControlBar";

interface RootProps {
  width: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

const Content = styled.div<RootProps>`
  position: relative;
  height: 100px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  width: ${({ width }) => width}px;
`;

interface TimeLineProps {
  timeLineStart: DateTime;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, timeLineStart }) => {
  const [diff, setDiff] = useState<number | undefined>(0);
  const { onStartChange, onEndChange, start, end } = useControlsBar();

  const {
    event: {
      state: { events, startTime, endTime },
    },
  } = useMainContext();

  useEffect(() => {
    const newDiff = end.diff(start, "seconds").toObject();
    setDiff(newDiff.seconds);
  }, [start, end]);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const width = calculateWidthValue(
    timeLineStart,
    DateTime.fromISO(last(events)?.end ?? "3000")
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const { start, end } = calculateNewInterval(
        timeLineStart,
        startTime,
        endTime,
        contentRef.current!,
        e.clientX
      );

      onStartChange(convertDateTimeToMoment(start));
      onEndChange(convertDateTimeToMoment(end));
    },
    [diff]
  );

  return (
    <Root>
      <Content ref={contentRef} width={width} onClick={onClick}>
        {children}
      </Content>
    </Root>
  );
};

export default TimeLine;
