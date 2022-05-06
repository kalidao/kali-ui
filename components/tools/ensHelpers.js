// Resolve single address
export async function validateEns(ens, web3, error) {
  let address

  if (ens.slice(-4) === '.eth') {
    address = await web3.eth.ens.getAddress(ens).catch(() => {
      error ? error.toast(ens + ' is not a valid ENS.') : console.log(ens + ' is not a valid ENS.')
      return
    })
  } else if (web3.utils.isAddress(ens) == false) {
    error
      ? error.toast(ens + ' is not a valid Ethereum address.')
      : console.log(ens + ' is not a valid Ethereum address.')
    return
  } else {
    address = ens
  }

  if (ens === undefined) {
    error ? error.toast(ens + ' is not a valid ENS.') : console.log(ens + ' is not a valid ENS.')
    address = 'invalid'
    return
  }

  return address
}

// Resolve a list of addresses
export async function validateEnsList(list, web3, error) {
  let list_ = []

  for (let i = 0; i < list.length; i++) {
    if (list[i].slice(-4) === '.eth') {
      const address = await web3.eth.ens.getAddress(list[i]).catch(() => {
        error ? error.toast(list[i] + ' is not a valid ENS.') : console.log(list[i] + ' is not a valid ENS.')
        return
      })
      list_.push(address)
    } else if (web3.utils.isAddress(list[i]) == false) {
      error
        ? error.toast(list[i] + ' is not a valid Ethereum address.')
        : console.log(list[i] + ' is not a valid Ethereum address.')
      return
    } else {
      list_.push(list[i])
    }

    if (list[i] === undefined) {
      return
    }
  }

  return list_
}
