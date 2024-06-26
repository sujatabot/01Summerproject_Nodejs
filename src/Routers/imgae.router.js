import express from 'express';
import { createImage,getAllImages,getImageById,updateImageById,deleteImageById } from '../controllers/image.controller.js';
import { upload } from '../middleware/multer.js';

const router5 = express.Router();

router5.post('/admin/images/',(upload.single("url"), createImage));
router5.get('/admin/images/',getAllImages);
router5.get('/admin/images/:id', getImageById);
router5.put('/admin/images/:id',updateImageById);
router5.delete('/admin/images/:id', deleteImageById);

export { router5};