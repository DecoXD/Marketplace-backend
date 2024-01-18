import { CreationOptional,Optional ,DataTypes,InferAttributes,InferCreationAttributes,Model} from "sequelize"
import { database } from "../db/db"

// export interface UserAttributes {
//   id: number;
//   name: string;
//   login: string;
//   email: string;
//   password: string;
// }

// export type UserCreationAttributes = Optional<UserAttributes,'id'>

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare login: string;
  declare email: string;
  declare password: string;
}


User.init({
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    unique:true,
    primaryKey:true
  }
  ,
   name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  login:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  }

},{
  sequelize:database,
  modelName:'Users'

})

