import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Register = sequelize.define('Registration', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentaddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 medicalcondition:{
  type: DataTypes.STRING,
  allowNull: false,
 },
  query: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

 export const registertable = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Register table created successfully.");
  } catch (error) {
    console.error("Error creating Register table:", error);
  }
};

export { Register };
