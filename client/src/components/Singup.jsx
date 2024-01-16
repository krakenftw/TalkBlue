import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { axios } from "../axios";
const Singup = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const registerHandle = () => {
    setLoading(true);
    if (!username || !password || !confirmPassword || !name || !email) {
      return toast({
        status: "error",
        description: "No fields should be empty!",
      });
    }
    if (password != confirmPassword) {
      setPasswordMatch(false);
      return toast({
        status: "error",
        description: "Passwords do not match!",
      });
    } else {
      setPasswordMatch(true);
      axios
        .post("api/user/register", {
          name,
          email,
          username: username,
          password,
          confirmPass: confirmPassword,
          profilePic: pic,
        })
        .then((res) => {
          toast({
            status: "success",
            description: "Registered Successfully.",
          });
          setLoading(false);
        })
        .catch((err) => {
          toast({
            status: "error",
            description: err.response.data.error,
          });
          setLoading(false);
        });
    }
  };
  const handleFileUpload = (event) => {
    setLoading(true);
    if (event.target.files[0] == undefined) {
      toast({ description: "Invalid File Uploaded" });
      setLoading(false);
      return;
    }
    const headers = {
      "Content-Type": "multipart/form-data", // Or the appropriate content type
      Accept: "application/json", // Or the appropriate response type
    };
    const pic = event.target.files[0];
    if (
      pic.type === "image/jpg" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("upload_preset", "chattis");
      data.append("file", pic);
      axios
        .post("https://api.cloudinary.com/v1_1/djxwdmrmf/image/upload", data, {
          headers,
        })
        .then((res) => {
          setPic(res.data.url);
          toast({ description: "Image Uploaded", status: "success" });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast({
            status: "error",
            description: "An error occured while uploading profile picture.",
          });
          setLoading(false);
        });
    } else {
      toast({
        description: "Inavlid File Extension.",
        status: "error",
      });
      setLoading(false);
      return;
    }
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
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          color={"white"}
          className="mb-3"
        />
        <Input
          value={username}
          type="text"
          placeholder="username"
          color={"white"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="mb-3"
        />
        <Input
          value={email}
          type="email"
          placeholder="email"
          color={"white"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="mb-3"
        />
        <Input
          value={password}
          type={showPass ? "string" : "password"}
          placeholder="password"
          color={"white"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="mb-3"
          border={passwordMatch ? "1px solid white" : "1px solid red"}
        />
        <Input
          value={confirmPassword}
          type={showPass ? "string" : "password"}
          placeholder="confirm Password"
          color={"white"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="mb-3"
          border={passwordMatch ? "1px solid white" : "1px solid red"}
        />
        <Checkbox
          className="mb-3"
          color="white"
          onChange={(e) => {
            e.target.checked ? setShowPass(true) : setShowPass(false);
          }}
        >
          Show Password
        </Checkbox>
        <br />
        <FormLabel
          htmlFor="file"
          disabled={loading ? true : false}
          border={"1px solid white"}
          color={"white"}
          display={"flex"}
          justifyContent={"center"}
          borderRadius={"md"}
          p="10px"
          w="100%"
        >
          Upload Profile Picture
          <Input
            id="file"
            type="file"
            border={"0"}
            width={"auto"}
            className="mb-3"
            size={"lg"}
            onChange={handleFileUpload}
            display={"none"}
          />
        </FormLabel>

        <Button
          width="100%"
          disabled={loading}
          colorScheme="black"
          variant="outline"
          onClick={registerHandle}
          border={"1px solid white"}
          color={"white"}
        >
          {loading ? "Loading" : "Register"}
        </Button>
      </Box>
    </div>
  );
};

export default Singup;
