
import express from 'express';
import { upload } from '../middleware/multer.js';
import { createAboutusPhoto, deleteAboutusPhoto, getAllAboutusPhotos, updateAboutusPhoto } from '../controllers/aboutusphoto.controller.js';

const router10 = express.Router()

router10.post('/photos',upload.single('file'), createAboutusPhoto);
router10.get('/photos',getAllAboutusPhotos);

router10.put('/photos/:id',updateAboutusPhoto);
router10.delete('/photos/:id', deleteAboutusPhoto);

export{router10}