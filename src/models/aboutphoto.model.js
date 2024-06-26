import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

 const AboutUsPhotos = sequelize.define('AboutUsPhotos',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
 
});

export const aboutusphotostable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Photos table created successfully.");
    } catch (error) {
      console.error("Error creating User table:", error);
    }
};
 
 export {AboutUsPhotos};
