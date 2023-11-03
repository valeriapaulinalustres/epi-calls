import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import config from './src/config.js'
import "./src/persistence/dbConfig/dbConfig.js"
import usersRouter from './src/routes/users.router.js'
import projectsRouter from './src/routes/projects.router.js'
import sheetsRouter from './src/routes/sheets.router.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())


//Routes
app.get('/', (req,res)=>{
  res.json({mensaje: 'Funcionando backend de EPIcalls'})
})

app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter)
app.use("/api/sheets", sheetsRouter)


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

//conexión a moongose y poner en el word (verla de EPI)


//próx proyecto si tiene solo bd con login usar next con su server (video de fazt)

//dirección del backend: https://epi-calls-dghuty6mh-valeriapaulinalustres.vercel.app/

//dirección del frontend: https://epi-calls-disease.vercel.app/

//en las rutas pasar por header el accessToken que dió el endpoint token

