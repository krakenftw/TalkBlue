import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChatState } from "../context/ChatProvider";
import axios from "../axios";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogin = () => {
    setLoading(true);
    axios
      .post("/api/user/login", {
        username,
        password,
      })
      .then((res) => {
        toast({ status: "success", description: "Logged In!" });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setUser(res.data);
        return navigate("/chats");
      })
      .catch((err) => {
        console.log(err);
        toast({
          status: "error",
          description: "An error occurred",
        });
        setLoading(false);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div>
      <Box
        w="100%"
        d="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        textAlign="center"
      >
        <Input
          value={username}
          colorScheme="whiteAlpha"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          color={"white"}
          className="mb-3"
        />
        <Input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          color={"white"}
          className="mb-3"
          colorScheme="whiteAlpha"
        />
        <Button
          width="100%"
          disabled={loading}
          color={"white"}
          variant="outline"
          onClick={handleLogin}
        >
          {loading ? "Loading..." : <Text>Login</Text>}
        </Button>
      </Box>
    </div>
  );
};

export default Login;
