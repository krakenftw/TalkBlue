import { Box, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import MyChats from "./MyChats.jsx";
import ChatBox from "./ChatBox.jsx";
import SideBar from "./SideBar.jsx";
import { socket } from "../../socket.js";

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  const { user } = useChatState();

  return (
    <>
      {user && <SideBar />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        p="7px"
        w="100%"
        h="92.5vh"
        m="auto"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </>
  );
}

export default Chat;
