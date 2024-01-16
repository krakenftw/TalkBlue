import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import axios from "axios";
import Loading from "../misc/Loading";
import ChatCard from "./ChatCard";
import CreateGroupModal from "./CreateGroupModal";

function MyChats() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useChatState();
  const toast = useToast();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const handleGroupCreate = () => {};
  const fetchChats = () => {
    axios
      .get("/api/chat/get", config)
      .then((res) => {
        setChats(res.data.chats);
      })
      .catch((err) => {
        toast({ description: "An error occurred", status: "error" });
        console.log(err);
      });
  };
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };
  useEffect(() => {
    setLoading(true);
    fetchChats();
    setLoading(false);
  }, []);
  return (
    <>
      <Box
        display={{
          base: selectedChat ? "none" : "flex",
          md: "flex",
          sm: "none",
        }}
        flexDirection='column'
        w={{ base: "100%", md: "31%" }}
        m='0'
        backgroundColor='white'
        borderRadius='xl'
        p='5px 10px'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          m='10px 0px 20px 0px'
        >
          <Button onClick={onOpen}>New Group Chat</Button>
        </Box>
        <Box display='flex' flexDirection='column'>
          {!loading ? (
            <Stack overflowY='scroll'>
              {chats?.map((chat) => (
                <ChatCard
                  chat={chat}
                  key={chat._id}
                  handleChatClick={handleChatClick}
                />
              ))}
            </Stack>
          ) : (
            <Loading />
          )}
        </Box>
      </Box>
      <CreateGroupModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default MyChats;
