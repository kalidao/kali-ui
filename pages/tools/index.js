import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import AppContext from "../../context/AppContext"
import Layout from "../../components/structure/Layout"
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai"
import {
  Button,
  List,
  ListItem,
  Icon,
  Text,
  Box,
  Link,
  Heading,
  Spacer,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { supportedChains } from "../../constants/supportedChains"
import { getNetworkName } from "../../utils/formatters"
import Select from "../../components/elements/Select"
import ToolBox from "../../components/tools/ToolBox"

export default function Tools() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state
  const [network, setNetwork] = useState(1)

  const handleChange = async (e) => {
    let id = e.target.value
    if (chainId != id) {
      setNetwork(id)
      await value.switchChain(id)
    }
  }

  const handleConnect = async () => {
    await value.connect()
    if (chainId != network) {
      await value.switchChain(network)
    }
  }

  // useEffect(() => {
  //   if (network == 999) {
  //     setNetwork(1)
  //   }
  // }, [chainId])

  return (
    <Layout>
      <VStack>
        <HStack w="50%">
          <Text w="50%" fontSize="2xl" fontWeight="600">
            Select chain:
          </Text>
          <Spacer />
          <Select w="40%" onChange={handleChange} defaultValue={chainId}>
            {supportedChains.map((item, index) => (
              <option key={index} value={item.chainId}>
                {item.name}
              </option>
            ))}
          </Select>
        </HStack>
        <br />
        {(network != 999 && chainId != network) ||
        (network != 999 && chainId != network && account == null) ? (
          <>
            <HStack id="not-connected">
              <Icon as={AiOutlineWarning} />
              <Text>
                please connect your wallet to {getNetworkName(network)}
              </Text>
            </HStack>
            <Button className="transparent-btn" onClick={() => handleConnect()}>
              Connect
            </Button>
          </>
        ) : network != 999 && chainId == network ? (
          <>
            <HStack id="connected-to-network">
              <Icon as={AiOutlineCheckCircle} />
              <Text>
                <i>connected to {getNetworkName(network)}</i>
              </Text>
            </HStack>
            <br></br>
            <ToolBox web3={web3} chainId={chainId} />
          </>
        ) : null}
      </VStack>
    </Layout>
  )
}
