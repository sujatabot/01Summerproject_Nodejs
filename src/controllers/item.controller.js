import { Item,CheckInOut } from '../models/item.model.js';
import { Sequelize } from 'sequelize';


const addItem = async (req, res) => {
  try {
    const { name, quantity, category, description } = req.body;

    if (!name || !quantity || !category || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
    console.log('Successfully added item', newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};


const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findByPk(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  await item.update(req.body);
  res.status(200).json(item);
}

const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findByPk(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  await item.destroy();
  res.status(204).end();
}



const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      attributes: ['id', 'name', 'quantity', 'category', 'description', 'createdAt'], // Include all desired fields
      order: [['createdAt', 'DESC']], // Optionally, you can order by createdAt in descending order
    });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};



const getItemById = async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findByPk(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(item);
}
const checkInItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const quantityToAdd = parseInt(quantity);

    item.quantity += quantityToAdd;
    await item.save();


    await CheckInOut.create({ itemId: item.id, action: 'check-in', quantity: quantityToAdd });

    return res.status(200).json({ message: 'Item checked in successfully', item });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


   const checkOutItem = async (req, res) => {
  const { id } = req.params;
  const {  quantity } = req.body;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    const quantityToless = parseInt(quantity);
  
    item.quantity -= quantityToless;
    await item.save();


    await CheckInOut.create({ itemId: item.id,  action: 'check-out', quantity });

    return res.status(200).json({ message: 'Item checked out successfully', item });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const generateReport = async (req, res) => {
  try {
 

    const items = await Item.findAll({ include: CheckInOut });
    console.log("items",items)


    const report = items.map(item => ({
      item: item.name,
      quantity: item.quantity,
      checkInOutHistory: item.CheckInOuts.map(history => ({
        action: history.action,
        quantity: history.quantity,
        date: history.date,
      })),
    }));
    console.log("report",report)


    res.status(200).json(report);
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
};
   const searchItems = async (req, res) => {
    const { query } = req.query;
    console.log("query",query)
  
    try {
      const items = await Item.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: `%${query}%`
          }
        }
      });
  
      if (items.length === 0) {
        return res.status(404).json({ error: 'No items found' });
      }
  
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };





export { addItem, updateItem, deleteItem, getAllItems, getItemById ,checkInItem, checkOutItem, generateReport,searchItems, };
