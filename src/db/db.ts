const {Sequelize} = require("sequelize-typescript")

export const database = new Sequelize('marketplacenft','root','',{
  dialect:'mysql',
  host:'localhost'
})

database.authenticate().then(() =>{
  console.log('conectado')
}).catch((err:Error) => console.log(err))

