import styled from "@emotion/styled";

import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

export const H2 = styled.h2({
  marginBottom: 0,
  fontSize: fontSizes.font_size_8,
  fontWeight: 600,
  textDecoration: "underline",
  [`@media (min-width:${screenWidths.tablet})`]: {
    fontSize: fontSizes.font_size_10,
  },
});

export const Ul = styled.ul<{ gap: number }>((props) => ({
  marginLeft: 16,
  marginBottom: 0,
  "& > li": {
    marginTop: props.gap,
  },
}));
