import { FiTwitter, FiGithub, FiUsers } from 'react-icons/fi'
import ToS from '../elements/ToS'
import { Flex, Text } from '../../styles/elements/'

const SocialButton = (props) => {
  return (
    <button border="none" variant="none" bg="none" rounded={'full'} as={'a'} href={props.href} target="_blank">
      {props.children}
    </button>
  )
}

export default function Footer() {
  return (
    <Flex minH="10vh" minW="auto" id="footer">
      <Text fontSize="xs">
        Summoned with{' '}
        <a href="https://twitter.com/lex_DAO" target="_blank" rel="noreferrer">
          <i>LexDAO</i>
        </a>
      </Text>
      <ToS label="ToS" id="tos-button" />
      <Flex dir="row" gap="sm">
        <SocialButton href={'https://github.com/kalidao'}>
          <FiGithub />
        </SocialButton>
        <SocialButton href={'https://twitter.com/_KaliDAO'}>
          <FiTwitter />
        </SocialButton>
        <SocialButton href={'https://discord.com/invite/UKCS9ghzUE'}>
          <FiUsers />
        </SocialButton>
      </Flex>
    </Flex>
  )
}
