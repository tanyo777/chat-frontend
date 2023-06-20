export const toMiliSeconds = (
  hrs: number,
  minutes: number,
  seconds: number
): number => {
  return (hrs * 60 * 60 + minutes * 60 + seconds) * 1000;
};
