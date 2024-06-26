import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Blog = sequelize.define('Blog',{
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

export const blogtable = async() => {
    try{
        await sequelize.sync({alert: true});
        console.log("Blog table created successfully");
    }catch(error) {
        console.error("Error creating Blog table:", error);
    }
};

export {Blog};