import {
  getUsersService,
  registerUserService,
  loginUserService,
  getRefreshTokenService,
  logoutService
} from '../services/users.service.js';

//  import { generateToken } from "../utils.js";
// import logger from "../utils/winston.js";

export const getUsersController = async (req, res) => {
  try {
    const response = await getUsersService();
    res.json(response);
  } catch (error) {
    console.log('error', error);
    // logger.error("Error del controller", error);
  }
};

export const registerUserController = async (req, res) => {
  try {
    const response = await registerUserService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
    // logger.error("Error del controller", error);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const response = await loginUserService(req.body);
    res.json(response);
  } catch (error) {
    console.log('error', error);
  }
};

export const getRefreshTokenController = async (req, res) => {
  try {
    const response = await getRefreshTokenService(req.body)
    res.json(response)
  } catch (error) {
    console.log('error', error)
  }
}

export const logoutController = async (req, res) => {
  try {
    const response = await logoutService(req.body)
    res.json(response)
  } catch (error) {
    console.log('error', error)
  }
}
