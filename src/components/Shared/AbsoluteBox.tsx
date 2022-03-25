import styled from "@emotion/styled";

/**
 * A utility component to create space in the media section of a Mozilla Protocol card.
 * `mzp-c-card-media-wrapper` creates space with `padding`, but doesn't have any height` and `width`.
 * This utility component provides real `height` and `width` needed by `PlaceholderWrapper`.
 */
export default styled.div({
  position: "absolute",
  height: "100%",
  width: "100%",
});
