import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const Text1 = sequelize.define("Text1",{
    content: {
        type:DataTypes.TEXT,
        allownull: false
    },
    title: {
        type:DataTypes.STRING,
        allownull: false
    }
});

export const texttable1 = async() => {
    try{
     await sequelize.sync({alert:true});
     console.log("Text table created successfully");
    }catch(error){
     console.error("Error creating Text table:",error);
    }
};

export {Text1};