import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserListSystem({ each, handleUserChat }) {
  return (
    <div>
      <Box
        display='flex'
        onClick={handleUserChat}
        border='1px solid black'
        p='5px'
        borderRadius='10px'
        margin='10px 0px'
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
          <Text fontSize='l'>{each.name}</Text>
          <Text fontSize='sm'>
            <b>Email :</b> {each.email}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default UserListSystem;
