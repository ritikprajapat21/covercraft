import { db } from ".";
import { userTable, userTableType } from "./schema";

export async function createUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const user: userTableType = { name, email, isPro: false };

  try {
    db.insert(userTable).values(user);
  } catch (error) {
    return new Error("Error creating user" + error);
  }
}
