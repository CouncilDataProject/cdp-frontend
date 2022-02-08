import styled from "@emotion/styled";

export default styled.ul<{ gap: number }>((props) => ({
  marginLeft: "1.25rem",
  "& > li": {
    marginTop: props.gap,
  },
}));
