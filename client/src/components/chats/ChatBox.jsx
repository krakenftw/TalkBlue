import {
  Avatar,
  Box,
  Button,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "../misc/ProfileModal";
import SingleChat from "./SingleChat";
import { getOtherUser } from "../../lib/chatLogics";
import TypeWriter from "../../assets/TypeWriter.svg";
import { UserSquare } from "lucide-react";

function ChatBox() {
  const { selectedChat, user } = useChatState();
  let otherUser;
  if (selectedChat) {
    otherUser = getOtherUser(user, selectedChat.users);
  }
  return (
    <>
      <Box
        w='100%'
        m='0 0 0 7px'
        backgroundColor='white'
        h='100%'
        borderRadius='lg'
      >
        {selectedChat ? (
          <Box w='100%' height={"100%"}>
            <Box
              backgroundColor=''
              p='5px'
              border={"1px solid black"}
              borderRadius={"lg"}
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"7px"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  src={
                    !selectedChat.isGroupChat && otherUser.profilePic
                  }
                  name={
                    selectedChat.isGroupChat
                      ? selectedChat.chatName
                      : "hi"
                  }
                />
                <Text m='5px' fontSize={"lg"}>
                  {selectedChat.isGroupChat
                    ? selectedChat.chatName
                    : selectedChat.users[1].name}
                </Text>
              </Box>
              {!selectedChat.isGroupChat && (
                <ProfileModal user={selectedChat.users[1]}>
                  <Button>
                    <FontAwesomeIcon size='lg' icon={faEye} />
                  </Button>
                </ProfileModal>
              )}
            </Box>
            <SingleChat />
          </Box>
        ) : (
          <Box
            w='100%'
            h='100%'
            display='flex'
            justifyContent={"center"}
            alignItems={"center"}
            fontSize={"2xl"}
          >
            <Box
              display={{ md: "none" }}
              position={"relative"}
              top={"10px"}
            >
              <UserSquare />
            </Box>
            <Image boxSize='40%' src={TypeWriter} alt='Chattis' />
          </Box>
        )}
      </Box>
    </>
  );
}

export default ChatBox;
