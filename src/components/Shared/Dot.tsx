import styled from "@emotion/styled";

const DOT_SIZE = 20;
const DOT_MARGIN = 6;

const Dot = styled.div({
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: "50%",
  zIndex: 1,
});

export { Dot, DOT_MARGIN, DOT_SIZE };
