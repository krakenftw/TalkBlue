

export function getOtherUser(user, usersArray) {
  const filteredArray = usersArray.filter(
    (each) => each._id != user._id
  );
  return filteredArray[0];
}
