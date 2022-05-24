import { Button } from '@chakra-ui/react'

const SolidButton = (props) => {
  let id
  if (props.id) {
    id = props.id
  } else {
    id = 1
  }
  let onClick
  if (props.onClick) {
    onClick = props.onClick
  } else {
    onClick = ''
  }
  return (
    <Button className="solid-btn" id={id} onClick={onClick}>
      {props.children}
    </Button>
  )
}

export default SolidButton
