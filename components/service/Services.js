import { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import {
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Heading,
  HStack,
  VStack,
  Image,
  Button,
  Spacer,
  Wrap,
  WrapItem,
  Icon,
} from '@chakra-ui/react'
import { BsPlug } from 'react-icons/bs'
import { serviceHelper } from '../../constants/serviceHelper'

export default function Services(props) {
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
            <VStack h={'100%'}>
              <VStack h="30%" w={'100%'}>
                <Image fallbackSrc="https://via.placeholder.com/150" src={props.image} alt="" />
              </VStack>
              <Heading>{props.title}</Heading>
              <Text>{props.description}</Text>
            </VStack>
          </LinkOverlay>
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
        <Icon as={BsPlug} w={10} h={10} className="h1-icon" />
        <Heading as="h1">Services</Heading>
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
              {Object.entries(serviceHelper).map(([k, v]) => (
                <ProposalTile
                  key={`propTile-${k}`}
                  id={k}
                  title={serviceHelper[k]['title']}
                  description={serviceHelper[k]['description']}
                  image={serviceHelper[k]['image']}
                  link={serviceHelper[k]['link']}
                />
              ))}
            </Wrap>
          )}
        </>
      )}
    </>
  )
}
