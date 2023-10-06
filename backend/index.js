import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors'
import config from './src/config.js'
import "./src/persistence/dbConfig/dbConfig.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

const users = [];
const posts = [
  {
    name: 'Valeria',
    title: 'Ushuaia',
  },
  {
    name: 'Javier',
    title: 'Italia',
  },
];

let refreshTokens = [];

app.get('/', (req,res)=>{
  res.json({mensaje: 'Funcionando backend de EPIcalls'})
})

//Get users
app.get('/api/users', authenticateToken, (req, res) => {
  res.json(users);
});

//Get posts (example)
app.get('/api/posts', authenticateToken, (req, res) => {
  res.json(posts.filter((el) => el.name === req.user.name));
});

//Register users
app.post('/api/users/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //las contraseñas siempre se deben pasar como string para que funcionen!!

    const user = { name: req.body.name, password: hashedPassword, mail: req.body.mail, role: req.body.role };
    users.push(user);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('error');
  }
});

//Users login
app.post('/api/users/login', async (req, res) => {
  const user = users.find((el) => el.mail === req.body.mail);
  console.log(user);
  if (!user) {
    return res.status(400).send('Cannot find user');
  }
  try {
    //Authentication
    if (await bcrypt.compare(req.body.password, user.password)) {
      // res.send('Login successfull');

      //Authorization
      
      const userMail = { mail: req.body.mail };
      const accessToken = generateAccessToken(userMail);
      const refreshToken = generateRefreshToken(userMail);
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken, mail: user.mail, name:user.name, role:user.role});
    } else {
      res.send('Not allowed');
    }
  } catch (error) {
    res.status(500).send('error');
  }
});

//Refresh token after login (access token)
app.post('/api/users/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    const refreshToken = generateRefreshToken({ name: user.name });
      refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken:refreshToken });
  });
});

//Logout users
app.delete('/api/users/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((el) => el !== req.body.token);
  res.sendStatus(204);
});


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const PORT = config.PORT || 8081;

app.listen(PORT, () => {
  console.log('listening on port 8081');
});

//login común con useState login setlogin (ves pantalla gral o pantalla de quien ya se logueó)
//guarda access token  y refresh token en local storage
//manda en cada request el access token en el header. Headers: Bearer + accestoken
//hace un useeffect en app que tiene un setinterval que escribe al endpoint token cada x minutos y le pasa el refresh token y actuliza los valores de access y refresn en el localstorage
//este endpoint debe traer un nuevo refresh además el access.

//next como si fuera react. Typescript. css puro
//poner api/ a estas rutas
//crear carpetas y capas
//conexión a moongose y poner en el word (verla de EPI)
//env terminarlo

//próx proyecto si tiene solo bd con login usar next con su server (video de fazt)

//dirección del backend: https://epi-calls-dghuty6mh-valeriapaulinalustres.vercel.app/

//dirección del frontend: https://epi-calls-disease.vercel.app/

