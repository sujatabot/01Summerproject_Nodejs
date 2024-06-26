import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

 const HomePhotos = sequelize.define('HomePhotos',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
 
});

export const homephotostable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Photos table created successfully.");
    } catch (error) {
      console.error("Error creating User table:", error);
    }
};
 
 export {HomePhotos};
