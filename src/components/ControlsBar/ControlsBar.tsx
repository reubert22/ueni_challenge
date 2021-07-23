import { Button, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { DateTime } from "luxon";
import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import useControlsBar from "./hooks/useControlBar";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { isEmpty } from "lodash";
import SelectInput from "../Shared/SelectInput/SelectInput";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  width: 100%;

  div {
    width: 100%;
    margin-bottom: 10px;

    input {
      width: 100%;
    }
  }
  button {
    margin-left: 0px !important;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;

    div {
      margin-bottom: 0px;
      padding: 0px;
      input {
        width: auto;
      }
    }

    button {
      width: 500px;
      margin-left: 1rem !important;
    }
  }
`;

const StyledDateTimeFormControl = styled(FormControl)`
  && {
    min-width: 200px;

    .MuiFormLabel-root {
      flex: 1;
      position: relative;
    }

    input {
      border: none;
      border-bottom: 1px solid;
      padding-bottom: 6px;
    }
  }
`;

const StyledResetButton = styled(Button)`
  && {
    margin-left: 1rem;
  }
`;

interface ControlBarProps extends HTMLAttributes<HTMLDivElement> {
  timeLineStart: DateTime;
}

const ControlsBar: React.FC<ControlBarProps> = ({
  timeLineStart,
  ...props
}) => {
  const {
    start,
    end,
    nameFilterOptions,
    nameFilterValue,
    onEndChange,
    onFilterChange,
    onStartChange,
  } = useControlsBar();

  return (
    <Root {...props}>
      <StyledDateTimeFormControl>
        <InputLabel shrink>Start</InputLabel>
        <Datetime value={start.toJSDate()} onChange={onStartChange} />
      </StyledDateTimeFormControl>

      <StyledDateTimeFormControl>
        <InputLabel shrink>End</InputLabel>
        <Datetime value={end.toJSDate()} onChange={onEndChange} />
      </StyledDateTimeFormControl>

      <SelectInput
        label="Organizer"
        value={nameFilterValue ?? ""}
        onChange={(value) => {
          onFilterChange(value);
        }}
      >
        {nameFilterOptions.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </SelectInput>

      {!isEmpty(nameFilterValue) && (
        <StyledResetButton
          variant="contained"
          color={"primary"}
          onClick={() => onFilterChange("")}
        >
          Delete filter
        </StyledResetButton>
      )}
    </Root>
  );
};

export default ControlsBar;
