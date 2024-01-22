import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
export const EditModal = ({ isOpen, onClose, message, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              className="w-full border-2 rounded-lg px-4 py-2"
              value={message.content}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Edit
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
