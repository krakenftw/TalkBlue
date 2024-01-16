import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import "dotenv/config"
import { userModel } from "./schema/user.js";
mongoose.connect(process.env.MONGO_URI);

async function main() {
  const password = "foobar";
  const hashedPass = await bcrypt.hash(password, 10);

  for (let i = 0; i < 20; i++) {
    const newUser = new userModel({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password: hashedPass,
      profilePic: faker.internet.avatar(),
    });
    const savedUser = await newUser.save();
    console.log("Generated", savedUser.email);
  }
}

main()
  .then(async () => {
    console.log("Seeded database ");
  })
  .catch(async (e) => {
		console.error(e)
    await mongoose.disconnect();
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
