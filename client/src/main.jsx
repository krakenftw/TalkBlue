import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Chat from "./components/chats/Chat.jsx";
import ChatProvider from "./context/ChatProvider.jsx";
import { App } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <div className="cover">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/auth" element={<App />} />
            <Route path="/aboutus" element={<div>This is about us page</div>} />
          </Routes>
        </div>
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>,
);
