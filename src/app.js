import express from "express";
import cors from "cors";
import { router } from "./Routers/user.router.js";
import cookieParser from "cookie-parser";
import { registerUser } from "./controllers/users.controller.js";
import { getUserDetail , deleteUser , updateUser , loginAdmin } from "./controllers/admin.controller.js";
import { router1 } from "./Routers/photos.router.js";
import { createPhoto, deletePhotoById, getAllPhotos, getPhotoById, updatePhotoById } from "./controllers/photos.controller.js";
import { router3 } from "./Routers/contactus.router.js";
import { deleteContactForm, getAllContactForms, submitContactForm, updateContactForm } from "./controllers/contactus.controller.js";
import { router4 } from "./Routers/register.router.js";
import { deleteRegistrationForm, getAllRegistrationForms, submitRegistrationForm, updateRegistrationForm } from "./controllers/register.controller.js";

import { router5 } from "./Routers/imgae.router.js";
import { createImage, deleteImageById, getAllImages, getImageById,updateImageById } from "./controllers/image.controller.js";
import { router6 } from "./Routers/blog.router.js";
import { createBlog, deleteBlog,  getblog, getblogId, updateBlog } from "./controllers/blog.controller.js";
import { upload } from "./middleware/multer.js";
import { router7 } from "./Routers/itemRoutes.js";
import { addItem,updateItem,deleteItem,getItemById,checkInItem,checkOutItem,generateReport, getAllItems, searchItems } from "./controllers/item.controller.js";
import { router8 } from "./Routers/text.router.js";
import { createText, deleteText, getText, getTextById, updateText } from "./controllers/text.controller.js";
import { router9 } from "./Routers/homepage.router.js";
import { createHomePhoto, deleteHomePhoto, getAllHomePhotos, updateHomePhoto } from "./controllers/homepagephoto.js";
import { router10 } from "./Routers/aboutusphoto.router.js";
import { createAboutusPhoto, deleteAboutusPhoto, getAllAboutusPhotos, updateAboutusPhoto } from "./controllers/aboutusphoto.controller.js";
import { router11 } from "./Routers/text1.router.js";
import { createText1, deleteText1, getText1, updateText1, getText1ById } from "./controllers/text1.controller.js";
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "500kb" })); 

// Routes
app.use("/api/v1", router); 
app.post("/api/v1/users/register", registerUser); 
// AdminRoutes
app.get("/api/v1/admin/users", getUserDetail);
app.delete("/api/v1/admin/users/:userId", deleteUser);
app.put("/api/v1/admin/users/:userId", updateUser);
app.post("/api/v1/admin/login", loginAdmin);

//photosroutes
app.use("/api/v2",router1);
app.post("/api/v2/admin/photos",createPhoto);
app.get("/api/v2/admin/photos", getAllPhotos );
app.get("/api/v2/admin/photos/:id", getPhotoById);
app.put("/api/v2/admin/photos/:id", updatePhotoById);
app.delete("/app/v2/admin/photos/:id",deletePhotoById );
app.use('/uploads', express.static('uploads')); 

//contactroutes
app.use("/api/v3",router3);
app.post("/api/v3/Submit",submitContactForm);
app.get("/api/v3/admin/contactus",getAllContactForms);
app.delete("/api/v3/admin/contactus/:contactId",deleteContactForm);
app.put("/api/v3/admin/contactus/:contactId",updateContactForm);

//registerroutes
app.use("/api/v4",router4);
app.post("/api/v4/Submit",submitRegistrationForm);
app.get("/api/v4/admin/register",getAllRegistrationForms);
app.delete("/api/v4/admin/register/:registerId",deleteRegistrationForm);
app.put("/api/v4/admin/register/:registerId",updateRegistrationForm);

//imagesroutes
app.use("/api/v5",router5);
app.post("/api/v5/admin/images",createImage);
app.get("/api/v5/admin/images", getAllImages );
app.get("/api/v5/admin/images/:imageId", getImageById);
app.put("/api/v5/admin/images/:imageId", updateImageById);
app.delete("/app/v5/admin/images/:imageId",deleteImageById );
app.use('/uploads', express.static('uploads'));

//blogroutes
app.use("/api/v6",router6);
app.post("/api/v6/admin/blog", upload.single("file"), createBlog);
app.get("/api/v6/admin/blog", getblog);
app.get("/api/v6/admin/blog/:blogId",  getblogId);
app.delete("/api/v6/admin/blog/:blogId",  deleteBlog);
app.put("/api/v6/admin/blog/:blogId",  updateBlog);

//inventory 
app.use("/api/v7",router7);
app.post("/api/v7/items", addItem); 
app.put("/api/v7/items/:id", updateItem); 
app.delete("/api/v7/items/:id", deleteItem); 
app.get("/api/v7/items", getAllItems); 
app.get("/api/v7/items/:id", getItemById); 
app.post("/api/v7/items/:id/check-in", checkInItem); 
app.post("/api/v7/items/:id/check-out", checkOutItem); 
app.get("/api/v7/generate-repoprt", generateReport);
app.get("/api/v7/items/search", searchItems);

//textroutes
app.use("/api/v8",router8);
app.post("/api/v8/admin/text", createText);
app.get("/api/v8/admin/text", getText);
app.get("/api/v8/admin/text/:textId", getTextById);
app.delete("/api/v8/admin/text/:textId", deleteText);
app.put("/api/v8/admin/text/:textId", updateText);

//homephotoroutes
app.use("/api/v9",router9);
app.post("/api/v9/photos",upload.single('file'), createHomePhoto);
app.get("/api/v9/photos", getAllHomePhotos);
app.delete("/api/v9/photos:id", deleteHomePhoto);
app.put("/api/v9/photos:id", updateHomePhoto);

//aboutusroute
app.use("/api/v10",router10);
app.post("/api/v10/photos",upload.single('file'), createAboutusPhoto);
app.get("/api/v10/photos", getAllAboutusPhotos);
app.delete("/api/v10/photos:id", deleteAboutusPhoto);
app.put("/api/v10/photos:id", updateAboutusPhoto);

//text1route
app.use("/api/v11",router11);
app.post("/api/v11/admin/text", createText1);
app.get("/api/v11/admin/text", getText1);
app.get("/api/v11/admin/text/:textId", getText1ById);
app.delete("/api/v11/admin/text/:textId", deleteText1);
app.put("/api/v11/admin/text/:textId", updateText1);

export { app };
