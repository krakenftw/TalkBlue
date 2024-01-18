import {
  Text,
  Box,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useChatState } from "../../context/ChatProvider";
import { DeleteIcon, EditIcon, MoreVertical, TrashIcon } from "lucide-react";
import { socket } from "../../socket";

import axios from "../../axios";

function EachMessage({ message, setMessages }) {
  const { user } = useChatState();
  const Hours = new Date(message.createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const handleMessageDelete = () => {
    axios
      .delete("/api/messages/message/delete", {
        data: {
          messageId: message._id,
          chatId: message.chat,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((data) => {
        socket.emit("userDeletedMessage", message.chat);
        setMessages(data.data);
      })
      .catch((e) => console.error(e));
  };
  const handleEditMessage = () => {
    console.log("Send api req");
  };
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        {message.sender._id != user._id && (
          <Avatar
            size={"md"}
            margin={"0px 10px"}
            src={message.sender.profilePic}
          />
        )}
        <Text
          backgroundColor={"blue.200"}
          borderRadius={"lg"}
          padding={"2"}
          w={"auto"}
          className="flex"
          margin={
            message.sender._id === user._id
              ? "2px 2px 2px auto"
              : "2px 2px 2px 2px"
          }
        >
          {message.content}
          <Text className="mx-1 p-0 text-right text-[10px] mt-2">{Hours}</Text>
        </Text>
      </Box>
    </Box>
  );
}

export default EachMessage;
