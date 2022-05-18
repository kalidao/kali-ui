import { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import {
  Select,
  Text,
  Box,
  Grid,
  LinkBox,
  LinkOverlay,
  Heading,
  Center,
  VStack,
  HStack,
  Icon,
  Button,
  Flex,
  Container,
  Spacer,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { consultHelper } from '../../constants/consultHelper'

export default function Consult(props) {
  const [menuItem, setMenuItem] = useState(999) // arbitrary number where no proposal type is selected. if changed, must change below, too
  const value = useContext(AppContext)
  const { account, dao, remount } = value.state

  useEffect(() => {
    setMenuItem(999)
  }, [remount])

  const ProposalTile = (props) => {
    console.log(props)
    return (
      <WrapItem>
        <LinkBox
          className="proposal-type-tile glass"
          w={{
            sm: '350px',
            md: '225px',
            lg: '200px',
            xl: '180px',
            '2xl': '180px',
          }}
          h={{
            sm: '175px',
            md: '175px',
            lg: '200px',
            xl: '200px',
            '2xl': '200px',
          }}
        >
          <LinkOverlay href={props.link} isExternal>
            <HStack>
              <Icon as={props.icon} boxSize={9} p={2} rounded={5} border="1px solid white" />
              <Spacer />
            </HStack>
            <Heading>{props.title}</Heading>
          </LinkOverlay>
          <Text>{props.description}</Text>
        </LinkBox>
      </WrapItem>
    )
  }

  const updateMenuItem = (e) => {
    let newValue = e.target.value
    setMenuItem(newValue)
  }

  return (
    <>
      <HStack mb="2vh">
        <Icon as={BsPerson} w={10} h={10} className="h1-icon" />
        <Heading as="h1">Consult</Heading>
      </HStack>
      {dao == null ? null : account == null ? (
        <Box className="glass dashboard-tile" mt={10} color="white">
          <Text mb={5}>Please connect your account to start using extensions!</Text>
          <Button className="transparent-btn" onClick={value.connect} border="none">
            Connect
          </Button>
        </Box>
      ) : (
        <>
          {menuItem < 999 ? null : (
            <Wrap>
              {Object.entries(consultHelper).map(([k, v]) => (
                <ProposalTile
                  key={`propTile-${k}`}
                  id={k}
                  title={consultHelper[k]['title']}
                  description={consultHelper[k]['description']}
                  icon={consultHelper[k]['icon']}
                  link={consultHelper[k]['link']}
                />
              ))}
            </Wrap>
          )}
        </>
      )}
    </>
  )
}
