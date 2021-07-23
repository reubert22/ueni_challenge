import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { last } from "lodash";
import { DateTime } from "luxon";
import {
  calculateWidthValue,
  convertDateTimeToMoment,
  generateID,
  isIntervalFree,
} from "../../utils";
import { Button, MenuItem } from "@material-ui/core";
import { useMainContext } from "../../hooks/useMainContext";
import calculateNewInterval from "./utils";
import useControlsBar from "../ControlsBar/hooks/useControlBar";
import SelectInput from "../Shared/SelectInput/SelectInput";

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

const AddButtonContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 50px;
`;

const ErrorMessageContainer = styled.span`
  color: red;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 12px;
`;

const StyledResetButton = styled(Button)`
  && {
    margin-left: 1rem;
  }
`;

interface TimeLineProps {
  timeLineStart: DateTime;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, timeLineStart }) => {
  const [professionalValue, setProfessionalValue] = useState<string>("");
  const [showErrorAdd, setErrorAdd] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [diff, setDiff] = useState<number | undefined>(0);
  const {
    onStartChange,
    onEndChange,
    start,
    end,
    nameFilterValue,
    nameFilterOptions,
  } = useControlsBar();

  const {
    event: {
      state: { events, startTime, endTime },
      setEvent,
    },
  } = useMainContext();

  const handleCheckTime = useCallback(() => {
    const free = isIntervalFree(events, start, end);
    if (free) {
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
  }, [events, start, end]);

  useEffect(() => {
    const newDiff = end.diff(start, "seconds").toObject();
    setDiff(newDiff.seconds);
    handleCheckTime();
  }, [start, end, handleCheckTime]);

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

  const handleAddEvent = () => {
    setErrorAdd(false);
    if (!professionalValue) {
      setErrorAdd(true);
    } else {
      setEvent({
        start: startTime.toISO(),
        end: endTime.toISO(),
        id: generateID(),
        name: professionalValue,
      });
      setProfessionalValue("");
    }
  };

  return (
    <>
      <Root>
        <Content ref={contentRef} width={width} onClick={onClick}>
          {children}
        </Content>
      </Root>
      {showAdd && !nameFilterValue && (
        <>
          <AddButtonContainer>
            <SelectInput
              label="Select Professional *"
              value={professionalValue ?? nameFilterValue}
              onChange={(value) => {
                setProfessionalValue(value);
              }}
            >
              {nameFilterOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </SelectInput>
            <StyledResetButton
              variant="contained"
              color="primary"
              onClick={handleAddEvent}
            >
              Add event
            </StyledResetButton>
          </AddButtonContainer>
          {showErrorAdd && (
            <ErrorMessageContainer>Select professional</ErrorMessageContainer>
          )}
        </>
      )}
    </>
  );
};

export default TimeLine;
