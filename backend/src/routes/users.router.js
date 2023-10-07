import { Router } from 'express';
import authenticateToken from '../middlewares/token.js';
import {
  getUsersController,
  registerUserController,
  loginUserController,
  getRefreshTokenController,
  logoutController,
} from '../controllers/users.controller.js';

const router = Router();

//Gets a list of all users
router.get('/', authenticateToken, getUsersController);

//Register user
router.post('/register', registerUserController);

//Login user
router.post('/login', loginUserController);

//Get refresh token
router.post('/token', getRefreshTokenController);

//Logout
router.delete('/logout', logoutController);

export default router;
