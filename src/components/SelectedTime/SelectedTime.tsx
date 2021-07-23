import { DateTime } from "luxon";
import React from "react";
import styled from "styled-components";
import { useMainContext } from "../../hooks/useMainContext";
import {
  calculateLeftValue,
  calculateWidthValue,
  isIntervalFree,
} from "../../utils";

interface RootProps {
  left: number;
  width: number;
  free: boolean;
}

const Root = styled.div<RootProps>`
  position: absolute;
  height: 100%;
  border-left: 5px solid #585858;
  border-right: 5px solid #585858;
  width: ${({ width }) => width}px;
  left: ${({ left }) => left}px;
  background: ${({ free }) => (free ? "#4CAF50" : "#f44336b8")};
  z-index: 1;
  transition: all 170ms ease-in;
  box-sizing: border-box;
`;

interface SelectedTimeProps {
  timeLineStart: DateTime;
}

const SelectedTime: React.FC<SelectedTimeProps> = ({ timeLineStart }) => {
  const {
    event: {
      state: { events, startTime, endTime },
    },
  } = useMainContext();

  const left = calculateLeftValue(timeLineStart, startTime);
  const width = calculateWidthValue(startTime, endTime);
  const free = isIntervalFree(events, startTime, endTime);

  return <Root left={left} width={width} free={free} />;
};

export default SelectedTime;
