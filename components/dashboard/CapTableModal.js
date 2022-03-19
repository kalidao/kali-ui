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
          Member Details
        </Button>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        motionPreset="scale"
        scrollBehavior="outside"
      >
        <ModalOverlay bg="none" backdropFilter="blur(20px) hue-rotate(90deg)" />
        <ModalContent
          className="glass"
          background="none"
          boxShadow="5px 6px 3px 1px #450000 "
        >
          <ModalHeader>Cap Table</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CapTable />
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius="2xl"
              border="none"
              bg="blackAlpha.300"
              _hover={{ bg: "blackAlpha.500" }}
              _active={{ bg: "blackAlpha.500" }}
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
