import { config } from "dotenv"; 
import { database } from "./src/db/db";
import { router as authRouter } from "./src/routes/AuthRoutes";

config({path:'./.env.local'})

const express = require('express');
const app = express();
const port = parseInt(process.env.EXPRESS_SERVER_PORT!) 

app.use(express.json());

app.use('/',authRouter)
database.sync().then(() =>{
 app.listen(port)
})


