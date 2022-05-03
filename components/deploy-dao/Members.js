import { Input, Label, Title } from '../../styles/form';
import { styled } from '../../styles/stitches.config';
import { PlusIcon  } from '@radix-ui/react-icons';
const Flex = styled('div', {
  display: 'flex', 
  gap: '0.1rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});


export default function Members() {
  return (
    <>
      <Title>Cap Table</Title>
      <Flex>
        <Flex css={{ flexDirection: 'column'}}>
          <Label htmlFor="member">Member</Label>
          <Input placeholder="0x address or ENS" />
        </Flex>
        <Flex css={{ flexDirection: 'column'}}>
          <Label htmlFor="member">Shares</Label>
          <Input placeholder="1000" />
        </Flex>
      </Flex>
    </>
  )
}
