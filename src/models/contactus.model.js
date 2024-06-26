import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const ContactUs = sequelize.define('ContactUs', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    phonenum: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
});
 

export const contactustable= async()=>{
   
    try {
      await sequelize.sync({ alter: true });
      console.log("ContactUs table created successfully.");
    } catch (error) {
      console.error("Error creating ContactUs table:", error);
    }
};
export {ContactUs};