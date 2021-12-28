/**
 * Pad the number with 0 if it is < 10.
 */
export default function pad(num: number) {
  return `${num}`.padStart(2, "0");
}
