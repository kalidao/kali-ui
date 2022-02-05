import React, { useRef, useContext } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  DrawerFooter,
  Stack,
  useDisclosure,
  Textarea,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { init, sendForm } from "emailjs-com";
import { HiOutlineMail } from "react-icons/hi";
import { BiMailSend } from "react-icons/bi";

init(process.env.NEXT_PUBLIC_EMAIL_ID);

function ContactForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const initialField = useRef();
  const toast = useToast();

  const handleSend = (values) => {
    console.log(values);

    sendForm("default_service", "template_oketq6j", "#contact-form").then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        toast({
          title: "Success",
          description: "Email sent successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      function (error) {
        console.log("FAILED!", error);
        toast({
          title: "Failed",
          description: "We were not able to send this email.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<HiOutlineMail />}
        variant="solid"
        border="none"
        color="kali.300"
        borderRadius="2xl"
        className="transparent-btn"
      >
        Contact us
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        initialFocusRef={initialField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>What do you need help with?</DrawerHeader>
          <DrawerBody>
            <Stack
              as="form"
              id="contact-form"
              onSubmit={handleSubmit(handleSend)}
              spacing={2}
            >
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  ref={initialField}
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required!" })}
                />
                <FormErrorMessage>
                  {errors.name ? errors.name.message : null}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required!" })}
                />
                <FormErrorMessage>
                  {errors.email ? errors.email.message : null}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                  id="subject"
                  placeholder="Enter the subject"
                  {...register("subject", { required: "Subject is required!" })}
                />
                <FormErrorMessage>
                  {errors.subject ? errors.subject.message : null}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  placeholder="Enter a description of your needs"
                  {...register("message", { required: "Subject is required!" })}
                />
                <FormErrorMessage>
                  {errors.message ? errors.message.message : null}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="solid"
              border="none"
              type="submit"
              bg="#33ff33"
              form="contact-form"
              mr={3}
              _hover={{ bg: "#28bf28" }}
              rightIcon={<BiMailSend />}
            >
              Send
            </Button>
            <Button
              variant="solid"
              bg="kali.700"
              border="none"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ContactForm;
