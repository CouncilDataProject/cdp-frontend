import React, { CSSProperties, FC, ReactNode } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Placeholder = styled.div<{ isLoading: boolean }>((props) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  "& > div, & > div:nth-of-type(2):after": {
    position: "absolute",
    inset: 0,
  },
  "& > div:first-of-type": {
    // the content is visible when it's finished loading
    opacity: props.isLoading ? 0 : 1,
  },
  "& > div:nth-of-type(2)": {
    // the place holder ui is visible when content is loading
    opacity: props.isLoading ? 1 : 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.11)",
    overflow: "hidden",
  },
  "& > div:nth-of-type(2):after": {
    // the `after` slide through the placeholder to create a horizontal wave/loading effect
    content: '""',
    animation: `${waveKeyframe} 1.6s linear 0.5s infinite`,
    backgroundImage: "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent)",
    transform: "translateX(-100%)",
  },
}));

interface PlaceholderProps {
  contentIsLoading: boolean;
  children: ReactNode;
  placeholderStyle?: CSSProperties;
}

/**A wrapper to show a placeholder while the content is loading */
const PlaceholderWrapper: FC<PlaceholderProps> = ({
  contentIsLoading,
  children,
  placeholderStyle,
}: PlaceholderProps) => {
  return (
    <Placeholder isLoading={contentIsLoading}>
      <div>{children}</div>
      <div style={placeholderStyle} />
    </Placeholder>
  );
};

export default PlaceholderWrapper;
