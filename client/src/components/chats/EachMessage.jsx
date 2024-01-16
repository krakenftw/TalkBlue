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
import {
  DeleteIcon,
  EditIcon,
  MenuIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import axios from "../axios.js";
import { socket } from "../../socket";

function EachMessage({ message, setMessages }) {
  const { user } = useChatState();

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
    //TODO: implement this
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
          margin={
            message.sender._id === user._id
              ? "2px 2px 2px auto"
              : "2px 2px 2px 2px"
          }
        >
          {message.content}
        </Text>
        {message.sender._id === user._id && (
          <Popover>
            <PopoverTrigger>
              <Button>
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Button
                      onClick={handleMessageDelete}
                      size='sm'
                      leftIcon={<TrashIcon />}
                      color='red.400'
                      variant='ghost'
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={handleEditMessage}
                      size='sm'
                      leftIcon={<EditIcon />}
                      color='blue.400'
                      variant='ghost'
                    >
                      Edit
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </Box>
    </Box>
  );
}

export default EachMessage;
