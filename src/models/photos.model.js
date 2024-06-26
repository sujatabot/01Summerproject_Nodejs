import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

 const Photo = sequelize.define('Photo',{
    filename: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export const photostable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("Photos table created successfully.");
    } catch (error) {
      console.error("Error creating User table:", error);
    }
};
 
 export {Photo};
