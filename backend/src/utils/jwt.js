import config from "../config.js";
import jwt from 'jsonwebtoken';


export function generateAccessToken(user) {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
  }
  
 export function generateRefreshToken(user) {
    return jwt.sign(user, config.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
  }