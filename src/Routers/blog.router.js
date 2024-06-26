import { Router } from "express";
import {
    createBlog,
    getblog,
    getblogId,
    updateBlog,
    deleteBlog
  } from '../controllers/blog.controller.js';
import { upload } from "../middleware/multer.js";

const router6 = Router();

router6.post('/admin/blog', upload.single('file'), createBlog);
router6.get('/admin/blog', getblog);
router6.get('/admin/blog/:blogId', getblogId);
router6.put('/admin/blog/:blogId', updateBlog);
router6.delete('/admin/blog/:blogId', deleteBlog);

export {router6};