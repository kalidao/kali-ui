import React from "react";
import CapTable from "./CapTable";
import {
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
function CapTableModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center>
        <Button className="transparent-btn" onClick={onOpen}>
          View Token Holdings
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cap Table</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CapTable />
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius="2xl"
              border="none"
              bg="kali.700"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CapTableModal;
