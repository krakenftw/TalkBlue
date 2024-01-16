import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useChatState } from "../../context/ChatProvider";
import EachMessage from "./EachMessage";
import { LeapFrog } from "@uiball/loaders";

import { socket } from "../../socket";
import { axios } from "../../axios";

function SingleChat() {
  const { selectedChat, user } = useChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const toast = useToast();
  const clearTyping = () => {
    setTyping(false);
  };
  const scrollToBottom = () => {
    console.log(chatBoxRef);
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleMessageSend = () => {
    setTyping(false);
    if (!content) return;

    axios
      .post(
        "/api/messages",
        {
          content: content,
          chatId: selectedChat._id,
        },
        config,
      )
      .then((res) => {
        socket.emit("new-message", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
        toast({
          title: "Error Occured while Sending Message",
          status: "error",
        });
      });
    setContent("");
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    setLoading(true);
    axios
      .get(`/api/messages/${selectedChat._id}`, config)
      .then((res) => {
        setMessages(res.data);
        socket.emit("join-chat", selectedChat._id);
        setLoading(false);
        scrollToBottom();
      })
      .catch((err) => {
        console.log("Error", err);
        toast({
          title: "Error Occured while fetching chats",
          status: "error",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message-received", (data) => {
      setMessages([...messages, data]);
      scrollToBottom();
    });
    socket.on("SomeOneTyping", () => {
      setTyping(true);
      scrollToBottom();
      setTimeout(clearTyping, 2000);
    });

    socket.on("message-deleted", () => {
      fetchMessages();
    });

    return () => {
      socket.off("message-received");
      socket.off("SomeOneTyping");
      socket.off("message-deleted");
    };
  }, [messages]);
  return (
    <Box
      display={"flex"}
      w="100%"
      h="90%"
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      {loading && <Spinner alignSelf={"center"} margin={"auto"} size={"xl"} />}
      <Box overflowY={"auto"} padding={"10px 10px"}>
        {messages &&
          messages.map((each) => (
            <EachMessage
              key={each._id}
              setMessages={setMessages}
              message={each}
            />
          ))}
        {typing && (
          <Box>
            <LeapFrog size={40} speed={1.8} />
          </Box>
        )}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p="10px"
      >
        <Input
          width={"92%"}
          border={"1px solid black"}
          borderBottomEndRadius={"0px"}
          borderTopEndRadius={"0px"}
          placeholder="Dont Curse!"
          value={content}
          onChange={(e) => {
            socket.emit("userTyping", selectedChat._id);
            setContent(e.target.value);
          }}
          onKeyDown={(key) => {
            if (key.code == "Enter") {
              handleMessageSend();
            }
          }}
        />
        <Button
          width={"8%"}
          backgroundColor={"white"}
          border={"1px solid black"}
          borderTopStartRadius={"0px"}
          borderBottomStartRadius={"0px"}
          onClick={handleMessageSend}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
}

export default SingleChat;
