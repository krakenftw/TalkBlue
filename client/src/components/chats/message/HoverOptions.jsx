import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

const HoverOptions = ({ arrowHover, user, message }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <div className={arrowHover ? "visible" : "invisible"}>
      <Popover
        placement={
          user._id == message.sender._id ? "bottom-end" : "bottom-start"
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <button onClick={onToggle}>
            <ChevronDown size={"15px"} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          {" "}
          <ButtonGroup className="mx-0">
            <button>Heloo</button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HoverOptions;
