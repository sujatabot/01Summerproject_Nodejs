import { Router } from "express";
import{
    createText, getText, getTextById, updateText, deleteText
} from '../controllers/text.controller.js';

const router8 = Router();
 
 router8.post('admin/text',createText);
 router8.get('admin/text',getText);
 router8.get('admin/text/:textId',getTextById);
 router8.put('admin/text/:textId',updateText);
 router8.delete('admin/text/:textId',deleteText);

 export {router8};
