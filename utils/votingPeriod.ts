export function votingPeriodToSeconds(period: number, type: string) {
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

export function formatVotingPeriod(seconds: number) {
  let time
  let text

  if (seconds < 3600) {
    time = seconds / 60
    if (time == 1) {
      text = 'Minute'
    } else {
      text = 'Minutes'
    }
  } else if (seconds < 86400) {
    time = seconds / 3600
    if (time == 1) {
      text = 'Hour'
    } else {
      text = 'Hours'
    }
  } else {
    time = seconds / 86400
    if (time == 1) {
      text = 'Day'
    } else {
      text = 'Days'
    }
  }
  return time + ' ' + text
}
