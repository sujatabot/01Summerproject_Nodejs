import { Router } from "express";
import { usersDetail,deleteUser,loginAdmin, } from "../src/Controllers/users.controller.js";
import { adminMiddleware } from "../middlewares/adminmiddleware";

const adminRouter = Router();
adminRouter.route("/adminlogin").post(loginAdmin);
adminRouter.route("/userDetail").post(usersDetail);
adminRouter.route("/delete/:id").delete(deleteUser);

export {adminRouter};