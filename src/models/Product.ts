import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Model } from "sequelize-typescript";
import { database } from "../db/db";




export class Product extends Model{
  declare product_id:CreationOptional<Number>;
  declare name:string;
  declare price:number;
  declare discription:string;
  declare parcels:number
  
}


Product.init({
  product_id:{
    type:DataTypes.NUMBER,
    allowNull:false,
    unique:true,
    autoIncrement:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  price:{
    type:DataTypes.NUMBER,
    allowNull:false
  },
  discription:{
    type:DataTypes.STRING,
    
  },
  parcels:{
    type:DataTypes.NUMBER,
  },
 
},{
  sequelize:database,
  modelName:"Products"
})