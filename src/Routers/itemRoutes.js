import { Router } from "express";
import { addItem,updateItem,deleteItem,getItemById,checkInItem,checkOutItem,generateReport, getAllItems, searchItems } from "../controllers/item.controller.js";


const router7 = Router();

router7.post('/items', addItem); // Add item
router7.put('/items/:id', updateItem); // Update item
router7.delete('/items/:id', deleteItem); // Delete item
router7.get('/items', getAllItems); // Get all items
router7.get('/items/:id', getItemById); // Get item by ID
router7.post('/items/:id/check-in', checkInItem); // Check-in item
router7.post('/items/:id/check-out', checkOutItem); // Check-out item
router7.get('/generate-report', generateReport); 
router7.get('/items/search', searchItems);



export{router7}