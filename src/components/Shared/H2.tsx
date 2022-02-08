import styled from "@emotion/styled";

import colors from "../../styles/colors";

export default styled.h2<{ hasBorderBottom?: boolean }>((props) => ({
  paddingBottom: props.hasBorderBottom ? 8 : 0,
  borderBottom: props.hasBorderBottom ? `1px solid ${colors.grey}` : 0,
}));
