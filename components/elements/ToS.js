import React from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { tos } from '../../constants/tos'

function ToS({ label, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button {...props} onClick={onOpen}>
        {label}
      </button>
      <Modal size="2xl" closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" id="tos">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>KaliCo Terms of Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactMarkdown>{tos}</ReactMarkdown>
          </ModalBody>
          <ModalFooter>{/* I accept */}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToS
