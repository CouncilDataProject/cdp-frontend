import padNumWithZero from "../../../../utils/padNumWithZero";

export const timePointToSeconds = (timePointInputStr: string) => {
  const nums = timePointInputStr.trim().split(":").reverse();
  let totalSeconds = 0;
  nums.forEach((n, i) => {
    const num = parseFloat(n);
    if (isNaN(num) || n.includes("-")) {
      // num is not a number, or is negative
      totalSeconds += NaN;
    } else {
      totalSeconds += num * Math.pow(60, i);
    }
  });
  if (totalSeconds) {
    totalSeconds = Math.floor(totalSeconds);
  }
  return totalSeconds;
};

export const secondsToTimePointStr = (totalSeconds: number) => {
  if (isNaN(totalSeconds)) {
    return "NaN";
  }

  const totalSecondsInt = Math.floor(totalSeconds);

  const hours = Math.floor(totalSecondsInt / 3600);
  const minutes = Math.floor((totalSecondsInt - hours * 3600) / 60);
  const seconds = totalSecondsInt - hours * 3600 - minutes * 60;

  const secondsStr = padNumWithZero(seconds);

  return hours > 0
    ? `${hours}:${padNumWithZero(minutes)}:${secondsStr}`
    : `${minutes}:${secondsStr}`;
};
