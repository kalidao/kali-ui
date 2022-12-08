export const proposalTypes: { [key: number]: string } = {
  0: 'MINT',
  1: 'BURN',
  2: 'CALL',
  3: 'VPERIOD',
  4: 'GPERIOD',
  5: 'QUORUM',
  6: 'SUPERMAJORITY',
  7: 'TYPE',
  8: 'PAUSE',
  9: 'EXTENSION',
  10: 'ESCAPE',
  11: 'DOCS',
}

export const voteTypes: { [key: number]: string } = {
  0: 'Simple Majority',
  1: 'Simple Majority with Quorum',
  2: 'Supermajority',
  3: 'Supermajority with Quorum',
}

export const votingPeriodUnits: { [key: number]: string } = {
  1: 'min',
  2: 'hour',
  3: 'day',
}
