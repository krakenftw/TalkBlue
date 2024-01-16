import {
  Avatar,
  Badge,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import axios from "../axios.js";
import UserListSystem from "./UserListSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function CreateGroupModal({ onOpen, isOpen, onClose }) {
  const [groupChatName, setGroupChatName] = useState();
  const [groupUsers, setGroupUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const { user, setChats, chats, selectedChat, setSelectedChat } =
    useChatState();
  const toast = useToast();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleUserSearch = async (e) => {
    if (!e.target.value) return;
    setLoading(true);
    axios
      .get(`/api/user/search?search=${e.target.value}`, config)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  function handleUserAdd(each) {
    if (groupUsers.includes(each)) return;
    setGroupUsers((groupUsers) => [...groupUsers, each]);
  }

  const handleUserRemoveList = (userIdToRemove) => {
    setGroupUsers(
      groupUsers.filter((item) => item._id !== userIdToRemove)
    );
  };

  const handleGroupCreate = () => {
    if (!groupChatName || !groupUsers) {
      return;
    }
    if (groupUsers.length < 2) {
      return toast({
        description: "Minimum 2 users required",
        status: "error",
      });
    }

    axios
      .post(
        "/api/chat/createGroup",
        {
          name: groupChatName,
          users: groupUsers,
        },
        config
      )
      .then((res) => {
        setChats((chats) =>
          chats ? [...chats, res.data] : [res.data]
        );
        setSelectedChat(res.data);
        onClose();
      })
      .catch((err) => console.log(res));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Name:</Text>
          <Input
            onChange={(e) => {
              setGroupChatName(e.target.value);
            }}
            placeholder='Chat Name'
          />
          <Text>Users:</Text>
          <Input
            onChange={handleUserSearch}
            placeholder='Add users'
          />
          <Box>
            {groupUsers?.map((each) => (
              <Badge
                m='3px'
                colorScheme='green'
                key={each._id}
                onClick={() => {
                  handleUserRemoveList(each._id);
                }}
              >
                {each.name} <FontAwesomeIcon icon={faXmark} />
              </Badge>
            ))}
          </Box>
          <Stack overflow='scroll' maxHeight='40vh'>
            {loading
              ? "Loading..."
              : searchResult?.map((each) => (
                  // <Box
                  //     backgroundColor="gray.300"
                  //     borderRadius="md"
                  //     padding="3px 4px"
                  //     key={each._id}>
                  //     <Avatar src={each.profilePic} name={each.name} />
                  //     {each.name}
                  // </Box>
                  <Box
                    onClick={() => {
                      handleUserAdd(each);
                    }}
                    key={each._id}
                  >
                    <Stack
                      display='flex'
                      flexDirection='row'
                      p='5px'
                      borderRadius='10px'
                      _hover={{
                        backgroundColor: "teal",
                        color: "white",
                      }}
                    >
                      <Avatar
                        src={each.profilePic}
                        name={each.name}
                        margin='0px 5px'
                      />
                      <Box>
                        <Text fontSize='sm'>
                          <b>UserName : </b> {each.username}
                        </Text>
                        <Text fontSize='sm'>
                          <b>Name : </b> {each.name}
                        </Text>
                        <Text fontSize='sm'>
                          <b>Email :</b> {each.email}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='green' onClick={handleGroupCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateGroupModal;
