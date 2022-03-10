import { VideoMediaType } from "./constants";

export function getMediaTypeFromUri(uri: string) {
  let type: string | undefined;
  if (uri.match(/youtu?.be/)) {
    type = VideoMediaType.youtube;
  } else {
    // uri must have media type webm or mp4
    const matches = uri.match(new RegExp(`(${VideoMediaType.webm}|${VideoMediaType.mp4})$`));
    if (matches) {
      type = matches[0];
    }
  }
  return type;
}

interface Source {
  src: string;
  type?: string;
}

export function getSource(uri: string) {
  const mediaType = getMediaTypeFromUri(uri);
  const source: Source = { src: uri };
  if (mediaType) {
    source.type = `video/${mediaType}`;
  }
  return source;
}
