export function truncateAddress(account) {
  return account.substr(0, 5) + '...' + account.substr(account.length - 4, account.length)
}
