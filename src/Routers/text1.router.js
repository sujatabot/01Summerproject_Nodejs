import { Router } from "express";

import { updateText1, createText1, getText1, getText1ById, deleteText1 } from "../controllers/text1.controller.js";

const router11 = Router();
 
 router11.post('admin/text',createText1);
 router11.get('admin/text',getText1);
 router11.get('admin/text/:textId',getText1ById);
 router11.put('admin/text/:textId',updateText1);
 router11.delete('admin/text/:textId',deleteText1);

 export {router11};
