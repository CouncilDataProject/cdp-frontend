import padNumWithZero from "./padNumWithZero";

/**
 *
 * @param sec_num The time duration in seconds.
 * @returns The number of seconds in hh:mm:ss format.
 */
function secondsToHHMMSS(sec_num: number) {
  const sec_int = Math.floor(sec_num);
  const hours = Math.floor(sec_int / 3600);
  const minutes = Math.floor((sec_int - hours * 3600) / 60);
  const seconds = sec_int - hours * 3600 - minutes * 60;

  return `${padNumWithZero(hours)}:${padNumWithZero(minutes)}:${padNumWithZero(seconds)}`;
}

export default secondsToHHMMSS;
