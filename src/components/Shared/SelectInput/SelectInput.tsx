import { FormControl, InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import React, { HTMLAttributes, SyntheticEvent } from "react";
import styled from "styled-components";
import "react-datetime/css/react-datetime.css";

const StyledOrganizerField = styled(FormControl)`
  && {
    min-width: 200px;
  }
`;

interface SelectInputProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  onChange: (value: SyntheticEvent | any) => void;
  value: string | null;
}

const SelectInput: React.FC<SelectInputProps> = ({
  children,
  label,
  onChange,
  value,
}) => (
  <StyledOrganizerField>
    <InputLabel shrink>{label}</InputLabel>
    <Select
      value={value ?? ""}
      onChange={(e) => {
        onChange(e.target.value as string);
      }}
    >
      {children}
    </Select>
  </StyledOrganizerField>
);

export default SelectInput;
