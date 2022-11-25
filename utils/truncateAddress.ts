export function truncateAddress(account: string) {
  return account.substr(0, 6) + '...' + account.substr(account.length - 4, account.length)
}
