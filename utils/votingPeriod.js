export function votingPeriodToSeconds(period, type) {
  switch (type) {
    case 'min':
      return period * 60
    case 'hour':
      return period * 60 * 60
    case 'day':
      return period * 60 * 60 * 24
    default:
      return new Error('Not a valid type.')
  }
}
