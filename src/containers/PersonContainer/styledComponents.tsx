import styled from "@emotion/styled";

export const H2 = styled.h2({
  textDecoration: "underline",
});

export const Ul = styled.ul<{ gap: number }>((props) => ({
  marginLeft: "1.25rem",
  "& > li": {
    marginTop: props.gap,
  },
}));
