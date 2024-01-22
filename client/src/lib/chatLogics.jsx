import axios from "../axios";
import { socket } from "../socket";

export function getOtherUser(user, usersArray) {
  const filteredArray = usersArray.filter((each) => each._id != user._id);
  return filteredArray[0];
}

export const handleMessageDelete = (message, setMessages, user) => {
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
  console.log("Send api req");
};
