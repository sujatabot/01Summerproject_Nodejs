import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";


import { getUserDetail , deleteUser , updateUser ,loginAdmin } from "../controllers/admin.controller.js";
import { userAuth } from "../middleware/userauthentication.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post('/admin/login',loginAdmin);

router.get('/admin/users/:userId',userAuth,getUserDetail);
router.delete('admin/users/:userId',userAuth,deleteUser);
router.put('/admin/users/:userId',updateUser);


export { router };