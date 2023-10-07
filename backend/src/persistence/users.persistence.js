import MongoDb from "./managers/usersManager.js";
import { userModel } from "./models/user.model.js";

let persistence = new MongoDb("Users", userModel);

export async function getUsers() {
  return await persistence.getUsers();
}

export async function registerUser(user) {
  return await persistence.registerUser(user);
}

export async function loginUser(user) {
  return await persistence.loginUser(user)
}

export async function getRefreshToken(user) {
  return await persistence.getRefreshToken(user)
}

export async function logout(token) {
  return await persistence.logout(token)
}