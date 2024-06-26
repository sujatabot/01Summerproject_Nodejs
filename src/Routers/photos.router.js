import express from 'express';
import { createPhoto, getAllPhotos, getPhotoById,updatePhotoById, deletePhotoById } from '../controllers/photos.controller.js';
import { upload } from '../middleware/multer.js';

const router1 = express.Router();

router1.post('/admin/photos',upload.single('file'), createPhoto);
router1.get('/admin/photos',getAllPhotos);
router1.get('/admin/photos/:id', getPhotoById);
router1.put('/admin/photos/:id',updatePhotoById);
router1.delete('/admin/photos/:id', deletePhotoById);

export { router1};