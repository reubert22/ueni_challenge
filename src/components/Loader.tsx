import { CSSProperties } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import styled from "styled-components";
import { useMainContext } from "../hooks/useMainContext";

interface LoaderProps {
  opacity?: number;
  inline?: boolean;
}

const Root = styled.div`
  position: absolute;
  top: 0;
  left: calc(50vw - 4rem);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const Loader: React.FC<LoaderProps> = ({ opacity, inline = false }) => {
  const {
    loading: { loading },
  } = useMainContext();

  if (!loading) return null;

  const style = {
    background: opacity ? `rgba(255, 255, 255, ${opacity})` : undefined,
    minHeight: inline ? "10rem" : undefined,
    minWidth: inline ? "10rem" : undefined,
    position: inline ? "relative" : undefined,
  } as CSSProperties;

  return (
    <Root style={style}>
      <CircularProgress color="secondary" />
    </Root>
  );
};

export default Loader;
