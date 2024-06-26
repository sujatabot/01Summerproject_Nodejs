import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Image = sequelize.define('Image',{
    filename: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export const imagetable = async() => {
    try{
        await sequelize.sync({ alter: true});
        console.log("Image table created successfully");
    } catch (error) {
        console.error("Error creating a image table:", error);
    }
};

export { Image};