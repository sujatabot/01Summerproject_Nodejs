import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lowStockThreshold: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 5,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

});

const CheckInOut = sequelize.define('CheckInOut', {
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM('check-in', 'check-out'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Item.hasMany(CheckInOut, { foreignKey: 'itemId' });
CheckInOut.belongsTo(Item, { foreignKey: 'itemId' });

export const itemtable = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Item table created successfully");
  } catch (error) {
    console.error("Error creating the item table:", error);
  }
};

export { Item, CheckInOut };
