import {
getUsers,
registerUser,
loginUser,
getRefreshToken,
logout
  } from "../persistence/users.persistence.js";
  

  
  export async function getUsersService() {
    const response = await getUsers();
    return response;
  }

  export async function registerUserService(user) {
    const response = await registerUser(user);
    return response;
  }

  export async function loginUserService(user) {
    const response = await loginUser(user)
    return response
  }
  
  export async function getRefreshTokenService(token) {
    const response = await getRefreshToken(token)
    return response
  }

  export async function logoutService(token) {
    const response = await logout(token)
    return response
  }