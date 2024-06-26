
import express from 'express';
import { upload } from '../middleware/multer.js';
import { createHomePhoto, deleteHomePhoto, getAllHomePhotos, updateHomePhoto } from '../controllers/homepagephoto.js';

const router9 = express.Router()

router9.post('/photos',upload.single('file'), createHomePhoto);
router9.get('/photos',getAllHomePhotos);

router9.put('/photos/:id',updateHomePhoto);
router9.delete('/photos/:id', deleteHomePhoto);

export{router9}