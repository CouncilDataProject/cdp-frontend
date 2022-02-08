import styled from "@emotion/styled";

import { fontSizes } from "../../styles/fonts";

export const H2 = styled.h2({
  marginBottom: 0,
  fontSize: fontSizes.font_size_10,
  fontWeight: 600,
  textDecoration: "underline",
});

export const Ul = styled.ul<{ gap: number }>((props) => ({
  marginLeft: 16,
  marginBottom: 0,
  "& > li": {
    marginTop: props.gap,
  },
}));
