export async function getSender(user, usersArray) {
  const filteredArray = usersArray.filter((each) => each != user);
  const sender = await userModel.findOne({
    _id: filteredArray[0]._id,
  });
  return sender;
}

export function getOtherUser(user, usersArray) {
  const filteredArray = usersArray.filter(
    (each) => each._id != user._id
  );
  return filteredArray[0];
}
