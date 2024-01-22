import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { handleMessageDelete } from "../../../lib/chatLogics";
import { EditModal } from "./EditModal";
import { useState } from "react";

const HoverOptions = ({ arrowHover, user, message, setMessages }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={arrowHover ? "visible" : "invisible"}>
      <Popover
        placement={
          user._id == message.sender._id ? "bottom-end" : "bottom-start"
        }
        isOpen={isOpen}
        onClose={onClose}
        className="bg-gray-700"
      >
        <PopoverTrigger>
          <button onClick={onToggle}>
            <ChevronDown size={"15px"} />
          </button>
        </PopoverTrigger>
        <PopoverContent maxW={"max-content"} className="bg-gray-500">
          <ButtonGroup
            onClick={handleMessageDelete}
            className=" flex items-center flex-col justify-center"
          >
            <button
              onClick={() => handleMessageDelete(message, setMessages, user)}
              className="mx-4 my-2"
            >
              Delete
            </button>
            <button
              className="mx-4 my-2"
              onClick={() =>
                openModal ? setOpenModal(false) : setOpenModal(true)
              }
            >
              Edit
            </button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
      <EditModal
        isOpen={openModal}
        message={message}
        setMessages={setMessages}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default HoverOptions;
