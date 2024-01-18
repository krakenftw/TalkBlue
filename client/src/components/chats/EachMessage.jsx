import { Text, Box, Avatar } from "@chakra-ui/react";
import { useChatState } from "../../context/ChatProvider";
import { socket } from "../../socket";

import axios from "../../axios";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import HoverOptions from "./message/HoverOptions";

function EachMessage({ message, setMessages }) {
  const [ArrowHover, setArrowHover] = useState(false);
  const { user } = useChatState();
  const Hours = new Date(message.createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <Box className="px-4">
      <Box display={"flex"} alignItems={"center"}>
        <Text
          backgroundColor={"blue.200"}
          borderRadius={"lg"}
          padding={"2"}
          w={"auto"}
          className="flex items-center"
          onMouseEnter={() => setArrowHover(true)}
          onMouseLeave={() => {
            setArrowHover(false);
          }}
          margin={
            message.sender._id === user._id
              ? "2px 2px 2px auto"
              : "2px 2px 2px 2px"
          }
        >
          {message.content}
          <div className="flex flex-col items-end ml-2">
            <HoverOptions
              arrowHover={ArrowHover}
              className={ArrowHover ? "visible" : "invisible"}
              size={"15px"}
              user={user}
              message={message}
              setMessages={setMessages}
            />
            <Text className="p-0 text-right text-[10px]">{Hours}</Text>
          </div>
        </Text>
      </Box>
    </Box>
  );
}

export default EachMessage;
