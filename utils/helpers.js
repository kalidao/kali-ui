// helper functions to assemble final `proposals` and `dao` objects

// votingPeriod
export const calculateVotingPeriod = (period, unit) => {
  let seconds;
  if (unit == 0) {
    seconds = period * 60 * 60 * 24;
  } else if (unit == 1) {
    seconds = period * 60 * 60;
  } else {
    seconds = period * 60;
  }
  console.log(seconds);
  return seconds;
};
