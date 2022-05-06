import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Button, Text, Icon, Divider } from '@chakra-ui/react'
import { getNetworkName } from '../../utils/formatters'
import { IoIosGitNetwork } from 'react-icons/io'

export default function Chain() {
  const value = useContext(AppContext)
  const { account, chainId, daoChain } = value.state
  // console.log(daoChain);
  // console.log(chainId);

  return (
    <>
      {chainId == null ? null : (
        <>
          <Icon as={IoIosGitNetwork} />
          <Button id="account" variant="link" border="none">
            {getNetworkName(chainId)}
            <Divider orientation="vertical" height="20px" border="1px solid" opacity="1.0" ml={2} mr={1} />
          </Button>
        </>
      )}
    </>
  )
}
