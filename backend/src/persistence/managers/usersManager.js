import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';
import { tokenModel } from '../models/token.model.js';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

export default class UsersManager {
  async getUsers() {
    try {
      const users = await userModel.find();
      console.log(users);
      if (users.length === 0) {
        console.log('no hay usuarios');
        return { success: false, message: 'No users in DB' };
      }

      const usersForFrontend = users.map((el) => {
        return {
          name: el.name,
          mail: el.mail,
          role: el.role,
          lastConnection: el.lastConnection,
          profession: el.profession,
          _id: el._id,
        };
      });

      return {
        success: true,
        message: 'Users got successfully',
        users: usersForFrontend,
      };
    } catch (error) {
      // logger.error("Error", error);
      throw new Error(error);
    }
  }

  async registerUser(user) {
    try {
      const exists = await userModel.find({ mail: user.mail });

      if (exists.length > 0) {
        return { message: 'User already exists', success: false };
      }

      const hashedPassword = await bcrypt.hash(user.password, 10); //las contraseñas siempre se deben pasar como string para que funcionen!!

      const newUser = { ...user, password: hashedPassword, lastConnection: '' };

      // res.status(201).send('User registered');
      await userModel.create(newUser);
      return { message: 'User created successfully', success: true };
    } catch (error) {
      console.log('error en manager');
    }
  }

  async loginUser(user) {
    try {
      const userInDb = await userModel.find({ mail: user.mail });
      console.log(userInDb);
      if (userInDb.length === 0) {
        return { success: false, message: 'Invalid Credentials' };
      }

      //Authentication
      if (await bcrypt.compare(user.password, userInDb[0].password)) {
        //Authorization
        const userMail = { mail: user.mail };
        const accessToken = generateAccessToken(userMail);
        const refreshToken = generateRefreshToken(userMail);

        await tokenModel.create({ name: refreshToken });

        //Add login connection time
        let today = new Date();
        const found = await userModel.findByIdAndUpdate(
          { _id: userInDb[0]._id },
          { lastConnection: today.toLocaleString() },
          { new: true }
        );

        return {
          success: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          mail: user.mail,
          name: userInDb[0].name,
          role: userInDb[0].role,
        };
      } else {
        return { success: false, message: 'Invalid Credentials' };
      }
    } catch (error) {
      console.log('error del manager');
    }
  }

  async getRefreshToken(token) {
    console.log('token',token)
    try {
      const refreshToken = token.token;
      if (refreshToken == null)
        return { success: false, message: 'No valid token' };

      const refreshTokens = await tokenModel.find({ name: refreshToken });
console.log('refresh', refreshTokens)
      if (refreshTokens[0].name !== refreshToken)
        return { success: false, message: 'No valid token' };

      let newAccessToken;
      let newRefreshToken

      jwt.verify(
        refreshToken,
        config.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) return { success: false, message: 'No valid token' };
          newAccessToken = generateAccessToken({ name: user.name });
          newRefreshToken = generateRefreshToken({ name: user.name });

          await tokenModel.create({ name: newRefreshToken })
        }
      );

      //Removes previous refreshToken
      // console.log('hoy',token)
      // await tokenModel.findOneAndRemove({ name: token.token });
      return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.log('error del manager', error);
    }
  }

  async logout(token) {
    try {
      await tokenModel.findOneAndRemove({ name: token.token });
      return { message: 'Logout succesfully', success: true };
    } catch (error) {
      console.log('error del manager', error);
    }
  }
}
