import { Router } from "express";
import loginController from "./app/controllers/login-controller.js";

const router = Router();

router.post("/createAccount", loginController.createAccount);
router.get("/login", loginController.login);
router.put("/updatePassword", loginController.newPassword);
router.get("/validateEmail", loginController.checkEmail);


// QUERY COOKIES WITH httpOnly = true
router.get('/queryCookieUserToken', loginController.checkUserToken);

export default router;