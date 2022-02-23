import { ECSentence } from "../../containers/EventContainer/types";

export function mockSentences(numSessions: number, numSentences: number) {
  const sentences: ECSentence[] = [];
  for (let sessionIndex = 0; sessionIndex < numSessions; sessionIndex++) {
    for (let sentenceIndex = 0; sentenceIndex < numSentences; sentenceIndex++) {
      sentences.push({
        session_index: sessionIndex,
        index: sessionIndex * numSentences + sentenceIndex,
        start_time: sentenceIndex,
        text: `This is a sentence ${sessionIndex * numSentences + sentenceIndex}.`,
        speaker_index: sentenceIndex,
        speaker_name: `Speaker ${sentenceIndex}`,
      });
    }
  }
  return sentences;
}
